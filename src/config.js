require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8001,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  RAPID_API_KEY: process.env.RAPID_API_KEY,
  USER: process.env.USER,
  jwtSecret: process.env.jwtSecret,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  DBPORT: process.env.DBPORT,
  HOST: process.env.HOST,
};
