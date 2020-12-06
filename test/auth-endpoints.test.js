const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const jwtAuth = require('../src/routes/jwtAuth')
require('dotenv').config()
const helpers = require('./test-helper')

describe('Auth Endpoints', function() {
    let db
    
    const testUser = {
            user_id: '1ac1a124-9aaa-4b2f-9cbb-6039a083f958',
            user_name: 'chris',
            user_email: 'chris@chris.com',
            user_password: 'chris',
    }
    
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db)
    })
    
    after('destory db', () => db.destroy())

    beforeEach('cleanup', () => helpers.cleanTable(db))

    afterEach('cleanup', () => helpers.cleanTable(db))
    
    describe(`POST /auth/login`, () => {
        before('insert users', () => {
            return db
                .insert(testUser)
                .into('users')
        })
        it('given a valid email and pw, respond with 201', ()=> {
            const login = {
               email: testUser.user_email,
               password: testUser.user_password
            }
        
        return supertest(app)
            .post('/auth/login')
            .send(login)
            .expect(201)
        })
    })

    describe(`POST /auth/register`, () => {
        it('Given a username, email and hashed password, respond with 201', ()=> {
            const user = {
                user_name: 'joey',
                email: 'joey14@joey.com',
                password: '$2b$10$1wrgb118.ic1ZC.O3.ocpeOaVbaT44hIszpgAB5Ol9fUi1g9P0q5.'
            }

            return supertest(app)
                .post(`/auth/register`)
                .send(user)
                .expect(201)
        })
    })    
})