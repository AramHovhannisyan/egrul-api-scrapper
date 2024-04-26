# About project

- API is build with express.js and typescript, to provide information from egrul.nalog.ru.
- First it looks for it locally, then scraps from egrul.nalog.ru if was not found.

# Instructions

To start the app

- Copy data from .env-sample to .env, and update variables if necessary. 
- Run `docker compose up`

# Params

SERVER_PORT - is the entry point to app API.

SEARCH_STRICT_MODE - To search by exact match (On by default)