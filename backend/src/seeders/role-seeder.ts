import { RoleEnum } from '@shared/enums/RoleEnum';
import Role from '../models/Role';

// --------------------------------------------------------------

const seedRoles = async () => {
    try {
        const existingRoles = await Role.find();
        if (existingRoles.length > 0) {
            console.log('Roles already seeded.');

            return;
        }

        const rolesToInsert = [RoleEnum.ADMIN, RoleEnum.USER].map((id) => ({ id }));
        await Role.insertMany(rolesToInsert);
        console.log('Roles seeded successfully.');
    } catch (error) {
        console.error('Error seeding roles:', error);
    }
};

export default seedRoles;
