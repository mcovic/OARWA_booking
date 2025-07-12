import dotenv from 'dotenv';
import path from 'path';

// --------------------------------------------------------------------

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const ENV_CONFIG = {
    API_PORT: process.env.API_PORT || 3000,
    API_URL: process.env.API_URL || 'http://localhost:3000',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/oarwa_booking',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'default_access_token_secret',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'default_refresh_token_secret',
} as const;

export {
    ENV_CONFIG,
};