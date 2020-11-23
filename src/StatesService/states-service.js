const StatesService = {
    getAllStates(knex) {
        return knex.select('*').from('states')
    },

    getByFips(knex, fips) {
        return knex.from('states').select('*').where('fips', fips).first()
    },
}

module.exports = StatesService