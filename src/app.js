const express = require('express');
const app = express();
const helmet  = require('helmet')
const pool = require("./db");
const { CLIENT_ORIGIN } = require('./config');
require('dotenv').config()
const cors = require('cors');
const axios = require("axios").default;
const StatesService = require('./StatesService/states-service')


app.use(helmet())
app.use(express.json())

app.use(cors({
  origin: CLIENT_ORIGIN
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
      res.json(states)
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

  
  res.json(results)
})

app.use((error, req, res, next) =>{ 
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'Server Error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})

module.exports = app;