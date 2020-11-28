const express = require('express');
const app = express();
require('dotenv').config()
// const knex = require('knex')
const cors = require('cors');
// const axios = require("axios").default;
// const helmet = require('helmet');
const {CLIENT_ORIGIN, RAPID_API_KEY, NODE_ENV} = require('./config');
const StatesService = require('./StatesService/states-service')

app.use(express.json())
app.use(cors())

app.use('/auth', require('./routes/jwtAuth'))
app.use('/api/saves', require('./routes/saves'))


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
  // .log(req.params)
  let fips = req.body.fips.map(fips => fips)
  console.log(fips)
  // const fips = req.params.fips
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


module.exports = app;