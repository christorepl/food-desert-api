const StatesService = {
    getAllStates(knex) {
        return knex.select('*').orderBy('state_name').from('states')
    },

    getByFips(knex, fips) {        
        return knex.select('*').from('states').where('fips', fips)
    },
}

module.exports = StatesService

// const StatesService = {
//     getAllStates(knex) {
//         return knex.select('*').from('states')
//     },

//     getByFips(knex, fips) {
//         return knex.select('*').from('states').where('fips', parseInt(fips))
//     },
// }

// module.exports = StatesService