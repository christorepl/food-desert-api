const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
require('dotenv').config()
const app = require('../src/app')

describe('Articles endpoints', function(){
    this.timeout(15000)
    let db

    before('make knex isntance', () => {
        db = knex({
            client: 'pg',
            connection: 'postgresql://chris@localhost/food-desert-test'
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('states').truncate())

    afterEach('cleanup', () => db('states').truncate())

    let testStates = [
        {
          id: 1,
          state_name: 'Alabama',
          fips: '1',
          state_abbrev: 'AL',
          pop: '1792147',
          covid_infections: '32133',
          covid_deaths: '190',
          poverty_rate: '16.8',
          food_insecurity_rate: '13.9',
          white: '66.2',
          black: '26.5',
          hispanic: '3.9',
          asian: '1.3',
          mixed_race: '1.6',
          other: '0.6',
          trump: '62.3',
          biden: '36.3',
          ranking_repub: 7,
          ranking_dem: 43,
          ranking_white: 31,
          ranking_black: 7,
          ranking_hispanic: 40,
          ranking_asian: 46,
          ranking_mixed: 45,
          ranking_other: 27,
          ranking_pov: 5,
          ranking_fi: 6
        },
        {
          id: 2,
          state_name: 'Alaska',
          fips: '2',
          state_abbrev: 'AK',
          pop: '1792147',
          covid_infections: '32133',
          covid_deaths: '190',
          poverty_rate: '11.1',
          food_insecurity_rate: '10.7',
          white: '62',
          black: '3.3',
          hispanic: '6.3',
          asian: '6',
          mixed_race: '7.4',
          other: '15',
          trump: '53.2',
          biden: '42.9',
          ranking_repub: 21,
          ranking_dem: 34,
          ranking_white: 37,
          ranking_black: 39,
          ranking_hispanic: 31,
          ranking_asian: 9,
          ranking_mixed: 2,
          ranking_other: 1,
          ranking_pov: 35,
          ranking_fi: 27
        },
        {
          id: 3,
          state_name: 'Arizona',
          fips: '4',
          state_abbrev: 'AZ',
          pop: '1792147',
          covid_infections: '32133',
          covid_deaths: '190',
          poverty_rate: '14.1',
          food_insecurity_rate: '11.7',
          white: '56.1',
          black: '4.3',
          hispanic: '30.2',
          asian: '3.1',
          mixed_race: '2.1',
          other: '4.3',
          trump: '49.1',
          biden: '49.4',
          ranking_repub: 26,
          ranking_dem: 27,
          ranking_white: 42,
          ranking_black: 34,
          ranking_hispanic: 4,
          ranking_asian: 19,
          ranking_mixed: 22,
          ranking_other: 8,
          ranking_pov: 14,
          ranking_fi: 20
        },
        {
          id: 4,
          state_name: 'Arkansas',
          fips: '5',
          state_abbrev: 'AR',
          pop: '1792147',
          covid_infections: '32133',
          covid_deaths: '190',
          poverty_rate: '16.8',
          food_insecurity_rate: '13.8',
          white: '73.4',
          black: '15.5',
          hispanic: '6.9',
          asian: '1.4',
          mixed_race: '2',
          other: '0.9',
          trump: '62.4',
          biden: '34.8',
          ranking_repub: 6,
          ranking_dem: 46,
          ranking_white: 26,
          ranking_black: 14,
          ranking_hispanic: 29,
          ranking_asian: 39,
          ranking_mixed: 26,
          ranking_other: 18,
          ranking_pov: 6,
          ranking_fi: 7
        }
      ]

    let alabama = [[{
        state_name: 'Alabama',
        state_abbrev: 'AL',
        id: 1,
        fips: '1',
        food_insecurity_rate: '13.9',
        ranking_fi: 6,
        poverty_rate: '16.8',
        ranking_pov: 5,
        trump: '62.3',
        biden: '36.3',
        ranking_repub: 7,
        ranking_dem: 43,
        white: '66.2',
        black: '26.5',
        hispanic: '3.9',
        asian: '1.3',
        other: '0.6',
        mixed_race: '1.6',
        ranking_mixed: 45,
        ranking_black: 7,
        ranking_white: 31,
        ranking_asian: 46,
        ranking_hispanic: 40,
        ranking_other: 27,
        pop: "1792147",
        covid_infections: "32133",
        covid_deaths: "190"
      }]]

    beforeEach('insert states', () => {
        return db
            .into('states')
            .insert(testStates)
    })

    it(`GET /api/state/all responds with 200 and all of the states`, () => {
        return supertest(app)
            .get('/api/state/all')
            .expect(200, testStates)
    })

    it(`GET /api/state/search/:fips responds with 200 and the specified state`, () => {
        const fips = 01
        const expectedState = alabama
        return supertest(app)
            .get(`/api/state/search?fips=${fips}`)
            .expect(200, expectedState)
    })
})