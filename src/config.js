module.exports = {
    PORT: process.env.port || 8001,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgresql://chris@localhost/food-desert',
    RAPID_API_KEY: process.env.RAPID_API_KEY || process.env.RAPID_API_KEY
  }