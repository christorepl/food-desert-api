const express = require('express');
const app = express();
const helmet  = require('helmet')
const pool = require("./db");
const { CLIENT_ORIGIN } = require('./config');
require('dotenv').config()
const cors = require('cors');
const axios = require("axios").default;
const StatesService = require('./StatesService/StatesService')


app.use(helmet())
app.use(express.json())

app.use(cors({
  origin: CLIENT_ORIGIN,
}))


app.use('/auth', require('./routes/jwtAuth'))
app.use('/api/save', require('./routes/saves'))



insertC19Data = async (data) => {
  try {
  const insertData = await data.map(state => {
    pool.query('UPDATE states SET covid_infections = $2, covid_deaths = $3 WHERE fips = $1', [state.fips, state.latest.confirmed, state.latest.deaths]
    )})
  } catch(err){
    console.error(err.message)
  }
}

app.get('/api/state/all', async (req, res, next) => {
  const knexInstance = req.app.get('db')

  var options = {
    method: 'GET',
    url: 'https://coronavirus-us-api.p.rapidapi.com/api/state/all',
    params: {source: 'nyt'},
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'coronavirus-us-api.p.rapidapi.com'
    }
  }

  axios.request(options).then(function (response) {
    insertC19Data(response.data.locations)
  }).catch(function (error) {
    console.error(error)
  })
 StatesService.getAllStates(knexInstance)
    .then(states => {
      for (let i = 0; i < states.length; i++) {
        //calculate covid rate and covid fatality rate and enter it into the respective state object
        states[i].covid_rate=(new Intl.NumberFormat().format((states[i].covid_infections/states[i].pop)*100))
        states[i].covid_fatality_rate=(new Intl.NumberFormat().format((states[i].covid_deaths/states[i].covid_infections)*100))
        }
        //these next few .sort's allow me to enter rankings for covid stats [infections, deaths, infection rate and fatality rate]
        states.sort((a,b) => {
          return a.covid_rate - b.covid_rate
        })
        const sortCovidRateStates = states.reverse()
        for (let i = 0; i < sortCovidRateStates.length; i++) {
          sortCovidRateStates[i].ranking_covid_rate=(i + 1)
        }
        sortCovidRateStates.sort((a, b) => {
          return a.covid_fatality_rate - b.covid_fatality_rate
        })
        const sortCovidFatalityRateStates = sortCovidRateStates.reverse()
        for (let i = 0; i < sortCovidFatalityRateStates.length; i++) {
          sortCovidFatalityRateStates[i].ranking_covid_fatality_rate=(i + 1)
        }
        sortCovidFatalityRateStates.sort((a, b) => {
          return a.covid_infections - b.covid_infections
        })
        const sortCovidInfectionsStates = sortCovidFatalityRateStates.reverse()
        for (let i = 0; i < sortCovidInfectionsStates.length; i++) {
          sortCovidInfectionsStates[i].ranking_covid_infections=(i + 1)
        }
        sortCovidInfectionsStates.sort((a, b) => {
          return a.covid_deaths - b.covid_deaths
        })
        const sortCovidDeathsStates = sortCovidInfectionsStates.reverse()
        for (let i = 0; i< sortCovidDeathsStates.length; i++) {
          sortCovidDeathsStates[i].ranking_covid_deaths=(i + 1)
        }
        sortCovidDeathsStates.sort((a, b) => {
          return a.id - b.id
        })
        let organizedStates = sortCovidDeathsStates
      res.json(organizedStates).status(200)
    })
    .catch(next)
})


app.get('/api/state/search', async (req, res, next) => {
  //example url: http://baseURL:port/api/state/search?fips=1,2
  const knexInstance = req.app.get('db')
  const fipsIds = req.query.fips
  const fips = fipsIds.split(',')
  let results = []
  for (let i = 0; i < fips.length; i++){
   await StatesService.getByFips(knexInstance, fips[i])
    .then(state => {
      state[0].covid_rate=(new Intl.NumberFormat().format((state[0].covid_infections/state[0].pop)*100))
      state[0].covid_fatality_rate=(new Intl.NumberFormat().format((state[0].covid_deaths/state[0].covid_infections)*100))
      if (!state) {
        return res.status(404).json({
          error : { message: `A US state with fips code ${fips} does not exist`}
        })
      }
      results.push(state)
      results.sort((a,b) => {
        return a[0].id - b[0].id
      })
      return results
    })
    .catch(next)
  }

  
  res.json(results).status(200)
})

app.use((error, req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', CLIENT_ORIGIN);
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'Server Error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})

module.exports = app;