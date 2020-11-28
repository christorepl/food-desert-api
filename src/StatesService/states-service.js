const StatesService = {
    getAllStates(knex) {
        return knex.select('*').from('states')
    },

    getByFips(knex, fips) {
        var options = {
            method: 'GET',
            url: 'https://coronavirus-us-api.p.rapidapi.com/api/state/all',
            params: {fips, source: 'nyt'},
            headers: {
              'x-rapidapi-key': 'f856ce1be7msh05dc252992ee3ebp1b11dejsn39f441ac34e3',
              'x-rapidapi-host': 'coronavirus-us-api.p.rapidapi.com'
            }
          };
        
          axios.request(options).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });
        
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