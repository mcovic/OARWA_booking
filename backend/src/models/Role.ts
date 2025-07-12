import { model, Schema } from 'mongoose';

// --------------------------------------------------------------

const roleSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
});

const Role = model('Role', roleSchema);

export default Role;