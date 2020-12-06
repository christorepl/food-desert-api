const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: process.env.DATABASE
})

// const pool = new Pool({
//     user: 'chris',
//     host: 'localhost',
//     port: 5432,
//     database: 'food-desert'
// })

module.exports = pool;

//DATABASE_URL='postgres://jkknuelixacsyg:6e4897fe1493881fdb74c49a47c051ca74d0025b4fb0764c2707cdba937e137a@ec2-3-214-46-194.compute-1.amazonaws.com:5432/d30r6e5usgfhbk'
