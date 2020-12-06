const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { expect } = require('chai')

describe('Auth Endpoints', function() {
    let db

    const testUsers = [
        {
          user_id: '1ac1a124-9aaa-4b2f-9cbb-6039a083f958',
          user_name: 'chris',
          user_email: 'chris@chris.com',
          user_password: 'chris',
        },
        {
          user_id: 'd1eff057-955f-4457-82d6-243b543ec34d',
          user_name: 'Tori',
          user_email: 'tori@tori.com',
          user_password: 'tori',
        },
      ];
      
    const testUser = testUsers[0]

    before('knex instance', () => {
        db = knex({
            client:'pg',
            connection: 'postgresql://chris@localhost/food-desert-test'
        })
        app.set('db', db)
    })

    after('destroy db', () => db.destroy())

    beforeEach('cleanup', () => db.destroy())
    afterEach('cleanup', () => db.destroy())

    describe(`POST /auth/login`, ()=> {
        beforeEach('insert users', () => {
            return db
                .insert(testUser)
                .into('users')
        })
        it(`Given valid login credentials, respond with 200`, () => {
            const login = {
                "user_email": "chris@chris.com",
                "password": "chris"
            }

            return supertest(app)
                .post('/auth/login')
                .send(login)
                .expect(200)
        })
    })
})