const express = require('express');
require('dotenv').config()
const knex = require('knex')
const app = express();
const cors = require('cors');
const axios = require("axios").default;
const helmet = require('helmet');
const {CLIENT_ORIGIN, RAPID_API_KEY, NODE_ENV} = require('./config');
const StatesService = require('./StatesService/states-service')

//WHICH BRANCH IS IT DEFAULTING TO
// const knexInstance = knex({
//   client: 'pg',
//   connection: process.env.DB_URL
// })

//covid api//
// var options = {
//   method: 'GET',
//   url: 'https://coronavirus-us-api.p.rapidapi.com/api/county/all',
//   params: {source: 'nyt', fips: '01, 02'},
//   headers: {
//     'x-rapidapi-key': RAPID_API_KEY,
//     'x-rapidapi-host': 'coronavirus-us-api.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });
//covid api

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

const PORT = process.env.PORT || 8001;

app.get('/api/states', (req, res, next) => {
  const knexInstance = req.app.get('db')
  StatesService.getAllStates(knexInstance)
    .then(states => {
      res.json(states)
    })
    .catch(next)
})

app.get('/api/states/:fips', (req, res, next) => {
  const knexInstance = req.app.get('db')
  console.log(req.params)
  const fips = req.params.fips
  StatesService.getByFips(knexInstance, fips)
    .then(state => {
      if (!state) {
        return res.status(404).json({
          error : { message: `A US state with fips code ${fips} does not exist`}
        })
      }
      res.json(state)
    })
    .catch(next)
})

app.get('/api/*', (req, res) => {
res.json({ok: true});
});

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;