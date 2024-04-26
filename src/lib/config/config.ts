import { fromEnv } from "../utils/configUtils";

const SERVER_PORT = fromEnv("SERVER_PORT");
const NODE_ENV = fromEnv("NODE_ENV");
const MONGO_USERNAME = fromEnv("MONGO_USERNAME");
const MONGO_PASSWORD = fromEnv("MONGO_PASSWORD");
const MONGO_DB_NAME = fromEnv("MONGO_DB_NAME");
const MONGO_HOST = fromEnv("MONGO_HOST");
const MONGO_DB_LOCAL_PORT = fromEnv("MONGO_DB_LOCAL_PORT");
const REQUEST_API = fromEnv("REQUEST_API");
const SEARCH_STRICT_MODE  = fromEnv("SEARCH_STRICT_MODE");
const OPTION_PER_PAGE = fromEnv("OPTION_PER_PAGE");

export const config = {
  server: {
    port: SERVER_PORT,
    env: NODE_ENV
  },
  mongo: {
    host: MONGO_HOST,
    db: MONGO_DB_NAME,
    user: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    port: MONGO_DB_LOCAL_PORT,
  },
  api: {
    url: REQUEST_API,
    strictMode: SEARCH_STRICT_MODE,
  },
  options: {
    perPage: OPTION_PER_PAGE,
  },
};
