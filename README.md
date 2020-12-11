# Food Justice Now!

## Intent of Application
This app allows users to explore and investigate data related to food insecurity, COVID, racial demographics, poverty and voting tendencies in the US. The app displays raw data numbers and includes visual aids in the form of pie graphs and bar charts to compare the data from different states.

[Link to Live App](https://food-justice-now.vercel.app/home)
[Server Repo](https://github.com/christorepl/food-desert-api)

![screenshot-1](https://raw.githubusercontent.com/christorepl/food-deserts/main/Screenshots/screenshot.png)

![screenshot-2](https://raw.githubusercontent.com/christorepl/food-deserts/main/Screenshots/screenshot2.png)


## Technologies

### Back-end
* Node.js
* Express
* Postgresql
* Heroku Deployment

### API used for COVID Data:
[coronavirus-us-api](https://rapidapi.com/Spiderpig86/api/coronavirus-us-api)

### Testing
* Mocha
* Chai
* Supertest

### Front-end
* React
* Vercel Deployment
* JSX
* CSS

## Authentication
| Method    | Endpoint           | Usage                 | Returns      |
| ------    | --------           | -----                 | -------      |
| POST      | /auth/login        | Authenticate a user   | JWT          | 

### `/auth/login`
#### POST
Endpoint for authenticating users
##### Request Body
| Type | Fields | Description |
| ---  | ---    | ---         |
| JSON | user_email, user_password | JSON containing a username and password string |

##### Responses

| Code | Description |
| --- | --- |
| 200 | Receive JWT with authenticated user_name and id inside payload | 
| 400 | Missing '{user_name OR password}' in request body | 
| 400 | Incorrect user_name or password | 


## User Registration 
| Method    | Endpoint        | Usage                 | Returns         |
| ------    | --------        | -----                 | -------         |
| POST      | /auth/register     | Register new user     | User Object     | 

### `/auth/users`
#### POST
Endpoint for registering new users

##### Request Body
| Type | Fields | Description |
| ---  | ---    | ---         |
| JSON | user_name, user_email, user_password | JSON containing username, email, password strings |

##### Responses

| Code | Description |
| --- | --- |
| 201 | Respond with JWT | 
| 400 | Missing '{user_name OR email OR password}' in request body | 
| 400 | Error response object containing a number of validation error messages |
| 401 | JSON response object containing message that user already exists


### `/auth/verify`
#### GET
Endpoint for authenticating users already logged in


##### Request Body
| Type | Fields | Description |
| ---  | ---    | ---         |
| JSON | user_id | JSON containing user_id |

##### Responses

| Code | Description |
| --- | --- |
| 200 | Respond with authentication status | 
| 401 | Unauthorized |

### `/api/state/all`
#### GET
Endpoint for updating COVID data and getting data for the interactive map. No user input required.

##### Responses

| Code | Description |
| --- | --- |
| 200 | Respond with JSON containing all states' data | 


### `/api/state/search`
#### GET
Endpoint for user searches

##### Request Body
| Type | Fields | Description |
| ---  | ---    | ---         |
| JSON | fips | JSON containing US state fips codes to search |

##### Responses

| Code | Description |
| --- | --- |
| 200 | Response with JSON containing all states' data | 
| 404 | Error message when user sends invalid fips codes

### `/api/save/saved_search`
#### GET
Endpoint for sending a particular user's saves

##### Request Body
| Type | Fields | Description |
| ---  | ---    | ---         |
| JSON | user.id | JSON containing user's id |

##### Responses

| Code | Description |
| --- | --- |
| 200 | Response with JSON containing user's saved searches data |


### `/api/save/saved_search/:save`
#### GET
Endpoint for sending a selected save from a particular user's saves

##### Request Body
| Type | Fields | Description |
| ---  | ---    | ---         |
| JSON | user.id, save | JSON containing user's id and name of the save|


##### Responses

| Code | Description |
| --- | --- |
| 200 | Response with JSON containing user's saved search data |

### `/api/save/saved_search/`
#### POST
Endpoint for saving a user's search

##### Request Body
| Type | Fields | Description |
| ---  | ---    | ---         |
| JSON | user.id, save_name, state_names, fips | JSON containing user's id, fips codes of states in the save, name of states in the save, and name of the save|


##### Responses

| Code | Description |
| --- | --- |
| 200 | Response with JSON containing user's saved searches data | 


### `/api/save/saved_search/:save_name`
#### POST
Endpoint for saving a user's search

##### Request Body
| Type | Fields | Description |
| ---  | ---    | ---         |
| JSON | user.id, save_name, new_save_name | JSON containing user's id, new name for user's save, and current name of user's save |


##### Responses

| Code | Description |
| --- | --- |
| 200 | Response with JSON containing user's updated save | 


### `/api/save/saved_search/:save_name`
#### DELETE
Endpoint for saving a user's search

##### Request Body
| Type | Fields | Description |
| ---  | ---    | ---         |
| JSON | user.id, save_name | JSON containing user's id name of user's save |


##### Responses

| Code | Description |
| --- | --- |
| 204 | Response with JSON containing success message |
| 401 | Error telling user that the save does not exist or is not their's