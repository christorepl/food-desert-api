module.exports = {
    PORT: process.env.PORT || 8001,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: 'postgres://pqyjfeimvnedzh:98fbe625d5cc10466c7e841887edcfb81e592779fc372cb7dc80b7ceb307c404@ec2-34-237-166-54.compute-1.amazonaws.com:5432/d3mhf43jk81eu3' || 'postgresql://chris@localhost/food-desert',
    RAPID_API_KEY: process.env.RAPID_API_KEY || process.env.RAPID_API_KEY,
    CLIENT_ORIGIN: 'https://food-desert.vercel.app/',
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    DBPORT: process.env.DBPORT,
    HOST: process.env.HOST
  }

  console.log(DATABASE_URL)