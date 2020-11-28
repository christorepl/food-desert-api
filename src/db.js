const Pool = require('pg').Pool

const pool = new Pool({
    user: 'chris',
    host: 'ec2-34-237-166-54.compute-1.amazonaws.com',
    port: 5432,
    database: "d3mhf43jk81eu3"
})

module.exports = pool;