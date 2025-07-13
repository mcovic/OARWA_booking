import { model, Schema, Types } from 'mongoose';

// --------------------------------------------------------------

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role_id: {
        type: Types.ObjectId,
        ref: 'Role',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (_: any, ret: Record<string, any>) {
            delete ret.password;

            return ret;
        },
    },
});

const User = model('User', userSchema);

export default User;