# About project

- The API is built on express.js and typescript and is designed to provide information from egrul.nalog.ru.

- First it searches locally, then requests it from egrul.nalog.ru if it is not found.

- If there are more than 1 result pages, the system makes a request for all pages and saves everything.

- Added a delay of 700 ml seconds between page requests to avoid captcha from egrul.nalog.ru.

- Documentation - /api-docs/#/default/get_api_v1_search

# Instructions

To start the app

- Copy the data from .env-sample to .env and update it if necessary. 
- Run `docker compose up`

# Environment variables

SERVER_PORT - is the entry point to app API.

SEARCH_STRICT_MODE - To search by exact match (On by default)

# Params

- keyword* - string - INN or OGRN (OGRNIP) or the name of the legal entity, full name of the individual entrepreneur

- stopped - true | false - Either the activity was discontinued or not

- page - integer - The page number (1 By default)