const knex = require('knex')
const app = require('./app')
const { PORT, RAPID_API_KEY, DB_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: DB_URL
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})