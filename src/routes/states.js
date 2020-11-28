// const StatesService = require('../StatesService/states-service')

// app.get('/api/states', (req, res, next) => {
//     const knexInstance = req.app.get('db')

//     StatesService.getAllStates(knexInstance)
//     .then(states => {
//     res.json(states)
//     })
//     .catch(next)
// })

  
// app.get('/api/states/search', async (req, res, next) => {
// //example url: http://baseURL:port/api/states/search?fips=01&fips=02
// const knexInstance = req.app.get('db')
// const { fips } = req.query
// let results = []
// for (let i = 0; i < fips.length; i++){
//     await StatesService.getByFips(knexInstance, fips[i])
//     .then(state => {
//     if (!state) {
//         return res.status(404).json({
//         error : { message: `A US state with fips code ${fips} does not exist`}
//         })
//     }
//     results.push(state)
//     return results
//     })
//     .catch(next)
// }
// res.json(results)
// })
  