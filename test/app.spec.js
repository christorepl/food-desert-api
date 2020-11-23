const app = require('../src/app')

describe('App', () => {
  it('GET / responds with an object saying ok true', () => {
    return supertest(app)
      .get('/api/')
      .expect({ok: true})
  })
})