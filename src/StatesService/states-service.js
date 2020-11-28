const StatesService = {
    getAllStates(knex) {
        return knex.select('*').from('states')
    },

    getByFips(knex, fips) {
        console.log('shoot')
        return knex.select('*').from('states').where('fips', parseInt(fips))
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