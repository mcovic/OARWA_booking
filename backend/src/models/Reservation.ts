import { model, Schema, Types } from 'mongoose';

// --------------------------------------------------------------

const reservationSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    user_id: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Reservation = model('Reservation', reservationSchema);

export default Reservation;