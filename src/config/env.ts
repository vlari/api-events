import dotenv from 'dotenv';

dotenv.config({ path: './src/config/.env' });

const env = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_URI: process.env.DB_URI,
    DB_NAME: process.env.DB_NAME,
    API_SECRET: process.env.API_SECRET
};

export default env;