import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import corsOptions from './cors-options';
import { errorHandler } from './middleware/error-handler';
import { MainRouter } from './routes/main-router';
import cookieParser from 'cookie-parser';
const cors = require('cors');

// --------------------------------------------------------------

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = process.env.API_PORT || 3000;
const app: Express = express();
const router = new MainRouter();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api', router.routes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`The server is listening on port:${PORT}`);
});
