const Pool = require('pg').Pool

const pool = new Pool({
    user: 'pqyjfeimvnedzh',
    password: '98fbe625d5cc10466c7e841887edcfb81e592779fc372cb7dc80b7ceb307c404',
    host: 'ec2-34-237-166-54.compute-1.amazonaws.com',
    port: 5432,
    database: "d3mhf43jk81eu3"
})

module.exports = pool;