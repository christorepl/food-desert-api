module.exports = {
    PORT: process.env.PORT || 8001,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://chris@localhost/food-desert',
    RAPID_API_KEY: process.env.RAPID_API_KEY || process.env.RAPID_API_KEY
  }