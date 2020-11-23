const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('Articles endpoints', function(){
    let db

    before('make knex isntance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('states').truncate())

    afterEach('cleanup', () => db('states').truncate())

    let testStates = [
        {state_name: 'Alabama', state_abbrev: 'AL', id: 1, fips: '1', food_insecurity_rate: '13.9', ranking_fi: 6, poverty_rate: '16.8', ranking_pov: 5, trump: '62.3', biden: '36.3', ranking_repub: 7, ranking_dem: 43, white: '66.2', black: '26.5', hispanic: '3.9', asian: '1.3', other: '0.6', mixed_race: '1.6', ranking_mixed: 45, ranking_black: 7, ranking_white: 31, ranking_asian: 46, ranking_hispanic: 40, ranking_other: 27}, 
        {state_name: 'Alaska', state_abbrev: 'AK', id: 2, fips: '2', food_insecurity_rate: '10.7', ranking_fi: 27, poverty_rate: '11.1', ranking_pov: 35, trump: '53.2', biden: '42.9', ranking_repub: 21, ranking_dem: 34, white: '62', black: '3.3', hispanic: '6.3', asian: '6', other: '15', mixed_race: '7.4', ranking_mixed: 2, ranking_black: 39, ranking_white: 37, ranking_asian: 9, ranking_hispanic: 31, ranking_other: 1}, 
        {state_name: 'Arizona', state_abbrev: 'AZ', id: 3, fips: '4', food_insecurity_rate: '11.7', ranking_fi: 20, poverty_rate: '14.1', ranking_pov: 14, trump: '49.1', biden: '49.4', ranking_repub: 26, ranking_dem: 27, white: '56.1', black: '4.3', hispanic: '30.2', asian: '3.1', other: '4.3', mixed_race: '2.1', ranking_mixed: 22, ranking_black: 34, ranking_white: 42, ranking_asian: 19, ranking_hispanic: 4, ranking_other: 8}, 
        {state_name: 'Arkansas', state_abbrev: 'AR', id: 4, fips: '5', food_insecurity_rate: '13.8', ranking_fi: 7, poverty_rate: '16.8', ranking_pov: 6, trump: '62.4', biden: '34.8', ranking_repub: 6, ranking_dem: 46, white: '73.4', black: '15.5', hispanic: '6.9', asian: '1.4', other: '0.9', mixed_race: '2', ranking_mixed: 26, ranking_black: 14, ranking_white: 26, ranking_asian: 39, ranking_hispanic: 29, ranking_other: 18}, 
    ]

    beforeEach('insert states', () => {
        return db
            .into('states')
            .insert(testStates)
    })

    it(`GET /api/states responds with 200 and all of the states`, () => {
        return supertest(app)
            .get('/states')
            .expect(200, testStates)
    })

    it(`GET /api/states/:fips responds with 200 and the specified state`, () => {
        //
        const fips = 01
        const expectedState = testStates[0]
        return supertest(app)
            .get('/states/${fips}')
            .expect(200, expectedState)
    })
})