const Pool = require('pg').Pool

const pool = new Pool({
    user: 'zaqefocjolnifq',
    password: '13869e6cd054823ee2f9ef782038bf14e7827bcf34c1c92b789c8ad464ccffda',
    host: 'ec2-54-82-208-124.compute-1.amazonaws.com',
    port: 5432,
    database: "d28avgd619b22i"
})

module.exports = pool;