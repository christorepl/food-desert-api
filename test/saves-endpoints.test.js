const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
require('dotenv').config()
const helpers = require('./test-helper')

describe('Saves Endpoints', () => {
    let db

    const testUser = {
        user_id: '1bc1a124-9aaa-4b2f-9cbb-6039a083f958',
        user_name: "jimmy",
        user_email: "jimmy@jimmy.com",
        user_password: "jimmy",
    }

    const testSave = {
        user_id: '1bc1a124-9aaa-4b2f-9cbb-6039a083f958',
        save_name: 'test_save',
        fips: '01, 56',
        state_names: 'Alabama, Wyoming'
    }

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db)
    })

    after('destory db', () => db.destroy())

    afterEach('cleanup', () => helpers.cleanSavesTable(db))
    afterEach('cleanup', () => helpers.cleanUsersTable(db))

    describe(`GET api/saved_search/:save`, () => {
        before('insert users', () => {
            return db
                .insert(testUser)
                .into('users')
        })

        before('insert save', () => {
            return db
                .insert(testSave)
                .into('user_saves')
        })

        it('given a valid save name and user id, respond with 200 and the named saved', () => {
            const header = {
                "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjA5NGY5YzEtZWU4Ni00YmY4LTkyYmQtMzdkZDQwN2IzNjNjIn0sImlhdCI6MTYwNzgxNDA2OCwiZXhwIjoxNjA3ODE3NjY4fQ.EiLhGdgTcz9bk6xFQI6N-o-QmDQNiCZhlYqzqktnw4U"
            }

            const user_id = {
                user_id: '1bc1a124-9aaa-4b2f-9cbb-6039a083f958',
            }

            return supertest(app)
                .get('/api/save/saved_search/test_save')
                .send(header, user_id)
                .expect(201)
        })


    })

    describe(`GET api/saved_search/`, () => {
        before('insert users', () => {
            return db
                .insert(testUser)
                .into('users')
        })

        before('insert save', () => {
            return db
                .insert(testSave)
                .into('user_saves')
        })

        it('given a valid save name and user id, respond with 200', () => {
            const header = {
                "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjA5NGY5YzEtZWU4Ni00YmY4LTkyYmQtMzdkZDQwN2IzNjNjIn0sImlhdCI6MTYwNzgxNDA2OCwiZXhwIjoxNjA3ODE3NjY4fQ.EiLhGdgTcz9bk6xFQI6N-o-QmDQNiCZhlYqzqktnw4U"
            }

            const user_id = {
                user_id: '1bc1a124-9aaa-4b2f-9cbb-6039a083f958',
            }

            return supertest(app)
                .get('/api/save/saved_search')
                .send(header, user_id)
                .expect(201)
        })
    })

    describe('POST api/save/saved_search', () => {
        before('insert users', () => {
            return db
                .insert(testUser)
                .into('users')
        })

        it('given valid new save data, responds with 201 and the newly created save', () => {
            const header = {
                "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjA5NGY5YzEtZWU4Ni00YmY4LTkyYmQtMzdkZDQwN2IzNjNjIn0sImlhdCI6MTYwNzgxNDA2OCwiZXhwIjoxNjA3ODE3NjY4fQ.EiLhGdgTcz9bk6xFQI6N-o-QmDQNiCZhlYqzqktnw4U"
            }

            const user_id = {
                user_id: '1bc1a124-9aaa-4b2f-9cbb-6039a083f958',
            }

            const body = {
                save_name: 'new save object',
                fips: '1, 56',
                state_names: 'Alabama, Wyoming'
            }

            return supertest(app)
                .post('/api/save/saved_search')
                .send(header, user_id, body)
                .expect(201)
        })
    })

    describe(`PUT api/save/saved_search/:save_name`, () => {
        before('insert users', () => {
            return db
                .insert(testUser)
                .into('users')
        })

        before('insert save', () => {
            return db
                .insert(testSave)
                .into('user_saves')
        })

        it('given a valid user, save name, and new save name, responds with 200 and the new save object', () => {
            const header = {
                "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjA5NGY5YzEtZWU4Ni00YmY4LTkyYmQtMzdkZDQwN2IzNjNjIn0sImlhdCI6MTYwNzgxNDA2OCwiZXhwIjoxNjA3ODE3NjY4fQ.EiLhGdgTcz9bk6xFQI6N-o-QmDQNiCZhlYqzqktnw4U"
            }

            const user_id = {
                user_id: '1bc1a124-9aaa-4b2f-9cbb-6039a083f958',
            }

            const new_save_name = 'updated save name'

            return supertest(app)
                .put('/api/save/saved_search/test_save')
                .send(header, user_id, new_save_name)
                .expect(201)

        })

    })

    describe(`DELETE /api/save/saved_search/:save_name`, () => {
        before('insert users', () => {
            return db
                .insert(testUser)
                .into('users')
        })

        before('insert save', () => {
            return db
                .insert(testSave)
                .into('user_saves')
        })

        it('given a valid save name and user id, respond with 204 and success message', () => {
            const header = {
                "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjA5NGY5YzEtZWU4Ni00YmY4LTkyYmQtMzdkZDQwN2IzNjNjIn0sImlhdCI6MTYwNzgxNDA2OCwiZXhwIjoxNjA3ODE3NjY4fQ.EiLhGdgTcz9bk6xFQI6N-o-QmDQNiCZhlYqzqktnw4U"
            }

            const user_id = {
                user_id: '1bc1a124-9aaa-4b2f-9cbb-6039a083f958',
            }

            return supertest(app)
                .delete('/api/save/saved_search/test_save')
                .send(header, user_id)
                .expect(204)
        })

    })

})