const Pool = require('pg').Pool

const pool = new Pool({
    user: 'chris',
    password: 'poop',
    host: 'localhost',
    port: 5432,
    database: "food-desert"
})

module.exports = pool;