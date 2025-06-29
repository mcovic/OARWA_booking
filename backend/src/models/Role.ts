import { RoleEnum } from '@shared/enums/RoleEnum';
import { model, Schema } from 'mongoose';

// --------------------------------------------------------------

const roleSchema = new Schema({
    name: {
        type: String,
        enum: Object.values(RoleEnum),
        required: true,
        unique: true,
    },
});

const Role = model('Role', roleSchema);

export default Role;