const express = require('express')
const app = express()
const helmet = require('helmet')
const {
  CLIENT_ORIGIN
} = require('./config')
require('dotenv').config()
const cors = require('cors')

app.use(helmet())
app.use(express.json())

app.use(cors({
  origin: CLIENT_ORIGIN,
}))

app.use('/auth', require('./routes/jwtAuth'))
app.use('/api/save', require('./routes/saves'))
app.use('/api/state', require('./routes/states'))

app.use((error, req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', CLIENT_ORIGIN)
  let response
  if (process.env.NODE_ENV === 'production') {
    response = {
      error: {
        message: 'Server Error'
      }
    }
  } else {
    response = {
      error
    }
  }
  res.status(500).json({
    msg: response
  })
})

module.exports = app