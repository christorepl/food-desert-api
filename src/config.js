module.exports = {
    PORT: process.env.PORT || 8001,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://chris@localhost/food-desert',
    CLIENT_ORIGIN: 'https://food-justice-now.vercel.app' || 'home',
    RAPID_API_KEY: process.env.RAPID_API_KEY || process.env.RAPID_API_KEY,
    USER: process.env.USER,
    jwtSecret: process.env.jwtSecret,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    DBPORT: process.env.DBPORT,
    HOST: process.env.HOST
}

    // DATABASE_URL: process.env.DATABASE_URL || 'postgresql://chris@localhost/food-desert',
    // CLIENT_ORIGIN: 'https://food-justice-now.vercel.app' || 'home',

