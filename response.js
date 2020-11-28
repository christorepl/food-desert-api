//example of response from API when searching multiple states

const response = 
[
    [
        {
            "id": 1,
            "state_name": "Alabama",
            "fips": "1",
            "state_abbrev": "AL",
            "poverty_rate": "16.8",
            "food_insecurity_rate": "13.9",
            "white": "66.2",
            "black": "26.5",
            "hispanic": "3.9",
            "asian": "1.3",
            "mixed_race": "1.6",
            "other": "0.6",
            "trump": "62.3",
            "biden": "36.3",
            "ranking_repub": 7,
            "ranking_dem": 43,
            "ranking_white": 31,
            "ranking_black": 7,
            "ranking_hispanic": 40,
            "ranking_asian": 46,
            "ranking_mixed": 45,
            "ranking_other": 27,
            "ranking_pov": 5,
            "ranking_fi": 6
        }
    ],
    [
        {
            "id": 4,
            "state_name": "Arkansas",
            "fips": "5",
            "state_abbrev": "AR",
            "poverty_rate": "16.8",
            "food_insecurity_rate": "13.8",
            "white": "73.4",
            "black": "15.5",
            "hispanic": "6.9",
            "asian": "1.4",
            "mixed_race": "2",
            "other": "0.9",
            "trump": "62.4",
            "biden": "34.8",
            "ranking_repub": 6,
            "ranking_dem": 46,
            "ranking_white": 26,
            "ranking_black": 14,
            "ranking_hispanic": 29,
            "ranking_asian": 39,
            "ranking_mixed": 26,
            "ranking_other": 18,
            "ranking_pov": 6,
            "ranking_fi": 7
        }
    ],
    [
        {
            "id": 51,
            "state_name": "Wyoming",
            "fips": "56",
            "state_abbrev": "WY",
            "poverty_rate": "10.7",
            "food_insecurity_rate": "12.2",
            "white": "84.4",
            "black": "1.1",
            "hispanic": "9.6",
            "asian": "0.9",
            "mixed_race": "2",
            "other": "2",
            "trump": "70.4",
            "biden": "26.7",
            "ranking_repub": 1,
            "ranking_dem": 51,
            "ranking_white": 9,
            "ranking_black": 48,
            "ranking_hispanic": 21,
            "ranking_asian": 49,
            "ranking_mixed": 27,
            "ranking_other": 9,
            "ranking_pov": 40,
            "ranking_fi": 18
        }
    ],
    [
        {
            "id": 2,
            "state_name": "Alaska",
            "fips": "2",
            "state_abbrev": "AK",
            "poverty_rate": "11.1",
            "food_insecurity_rate": "10.7",
            "white": "62",
            "black": "3.3",
            "hispanic": "6.3",
            "asian": "6",
            "mixed_race": "7.4",
            "other": "15",
            "trump": "53.2",
            "biden": "42.9",
            "ranking_repub": 21,
            "ranking_dem": 34,
            "ranking_white": 37,
            "ranking_black": 39,
            "ranking_hispanic": 31,
            "ranking_asian": 9,
            "ranking_mixed": 2,
            "ranking_other": 1,
            "ranking_pov": 35,
            "ranking_fi": 27
        }
    ]
]
console.log(response[1][0].id)