import dotenv from 'dotenv';
import path from 'path';

// --------------------------------------------------------------

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const allowedOrigins = [
    process.env.API_URL,
    process.env.CLIENT_URL,
];

const corsOptions = {
    // origin: process.env.API_URL,
    origin: function (origin: string, callback: Function) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}

export default corsOptions;
