import mongoose from 'mongoose';

// --------------------------------------------------------------

mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/oarwa_booking');

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Database connection error:', error);
});

db.once('open', () => {
    console.log('Database connected successfully');
});