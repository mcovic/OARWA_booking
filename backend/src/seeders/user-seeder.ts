import User from '../models/User';
import Role from '../models/Role';
import { RoleEnum } from '@shared/enums/RoleEnum';
import bcrypt from 'bcrypt';

// --------------------------------------------------------------

const seedUsers = async () => {
    try {
        const existingUsers = await User.find();
        if (existingUsers.length > 0) {
            console.log('Users already seeded.');
            return;
        }

        // Fetch role IDs
        const adminRole = await Role.findOne({ id: RoleEnum.ADMIN });
        const userRole = await Role.findOne({ id: RoleEnum.USER });

        if (!adminRole || !userRole) {
            throw new Error('Required roles not found. Seed roles first.');
        }

        // Passwords should be hashed
        const hashedAdminPassword = await bcrypt.hash('admin1234', 10);
        const hashedUserPassword = await bcrypt.hash('user1234', 10);

        const usersToInsert = [
            {
                first_name: 'Admin',
                last_name: 'User',
                username: 'admin',
                password: hashedAdminPassword,
                role_id: adminRole._id,
            },
            {
                first_name: 'Regular',
                last_name: 'User',
                username: 'user',
                password: hashedUserPassword,
                role_id: userRole._id,
            },
        ];

        await User.insertMany(usersToInsert);
        console.log('Users seeded successfully.');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

export default seedUsers;
