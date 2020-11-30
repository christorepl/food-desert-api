const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: process.env.DATABASE
})

// DATABASE_URL='postgres://pqyjfeimvnedzh:98fbe625d5cc10466c7e841887edcfb81e592779fc372cb7dc80b7ceb307c404@ec2-34-237-166-54.compute-1.amazonaws.com:5432/d3mhf43jk81eu3'

// const pool = new Pool({
//     user: 'chris',
//     host: 'localhost',
//     port: 5432,
//     database: 'food-desert'
// })

module.exports = pool;

