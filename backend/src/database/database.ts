import mongoose from 'mongoose';
import { ENV_CONFIG } from '@config/default';

// --------------------------------------------------------------

mongoose.connect(ENV_CONFIG.DB_URI || 'mongodb://localhost:27017/oarwa_booking');

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Database connection error:', error);
});

db.once('open', () => {
    console.log('Database connected successfully');
});