const Pool = require('pg').Pool
const {USER, PASSWORD, DATABASE, DBPORT, HOST} = require('./config')
require('dotenv').config()

const pool = new Pool({
    user: USER,
    password: PASSWORD,
    host: HOST,
    port: DBPORT,
    database: DATABASE
})

// const pool = new Pool({
//     user: 'chris',
//     host: 'localhost',
//     port: 5432,
//     database: 'food-desert'
// })

module.exports = pool;

