const StatesService = {
    getAllStates(knex) {
        return knex.select('*').orderBy('state_name').from('states')
    },

    getByFips(knex, fips) {        
        return knex.select('*').from('states').where('fips', fips)
    },
}

module.exports = StatesService


// getByFips(knex, fips) {        
//     return knex.select('*').from('states').where('fips', fips)
// },


// getByFips(knex, fips) {        
//     return knex.raw(`
//     SELECT *
//     FROM states
//     WHERE fips
//     IN ${fips}
//     RETURNING *
//     `)
