import express, { Express } from 'express';
import { ENV_CONFIG } from '@config/default';
import mongoose from 'mongoose';
import corsOptions from './cors-options';
import { errorHandler } from '@middleware/error-handler';
import { MainRouter } from '@routes/main-router';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import seedRoles from './seeders/role-seeder';
import seedUsers from './seeders/user-seeder';

// --------------------------------------------------------------

const PORT = ENV_CONFIG.API_PORT || 3000;
const app: Express = express();
const router = new MainRouter();

app.use(express.json());
app.use(cookieParser());
// @ts-ignore
app.use(cors(corsOptions));
app.use('/api', router.routes);
app.use(errorHandler);

mongoose.connect(ENV_CONFIG.DB_URI || 'mongodb://localhost:27017/oarwa_booking');
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Database connection error:', error);
});
db.once('open', async () => {
    console.log('Database connected successfully');

    await seedRoles();
    await seedUsers();

    console.log('Data seeding completed');
});

app.listen(PORT, () => {
    console.log(`The server is listening on port:${PORT}`);
});
