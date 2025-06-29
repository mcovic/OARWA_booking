import { ENV_CONFIG } from '@config/default';

// --------------------------------------------------------------

const allowedOrigins = [
    ENV_CONFIG.API_URL,
    ENV_CONFIG.CLIENT_URL,
];

const corsOptions = {
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
