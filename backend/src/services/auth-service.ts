import { ENV_CONFIG } from '@config/default';
import { BadRequestError, NotFoundError, UnauthorizedError, ValidationError } from '@errors/http-error';
import { LoginCredentialsDto } from '@shared/DTO/auth.dto';
import { UserDto } from '@shared/DTO/user.dto';
import { RoleEnum } from '@shared/enums/RoleEnum';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Role from '../models/Role';
import User from '../models/User';

// ----------------------------------------------------------------------

export class AuthService {
    public async register(userData: UserDto) {
        const usernameExists = !!(await User.findOne({ username: userData.username }));
        if (usernameExists)
            throw new BadRequestError('Korisničko ime već postoji');

        const hashPassword = await bcrypt.hash(userData.password, 10);
        const userRole = await Role.findOne({ id: RoleEnum.USER });
        const user = new User({
            ...userData,
            password: hashPassword,
            role_id: userRole, // default role for new users,
        });
        await user.save();

        if (!user) {
            throw new ValidationError('Neispravni podaci za registraciju');
        }

        return user;
    }

    public async login(loginCredentials: LoginCredentialsDto) {
        const foundUser = await User.findOne({ username: loginCredentials.username }).populate('role_id');

        if (!foundUser) {
            throw new NotFoundError('Neispravno korisničko ime ili lozinka');
        }

        const passwordMatch = await bcrypt.compare(loginCredentials.password, (foundUser as unknown as UserDto).password);
        if (!passwordMatch) {
            throw new UnauthorizedError('Neispravno korisničko ime ili lozinka');
        }

        const roleId = (foundUser.role_id as any).id;

        const accessToken = jwt.sign({
            id: foundUser._id.toString(),
            role_id: roleId,
        }, ENV_CONFIG.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        const refreshToken = jwt.sign({
            id: foundUser._id.toString(),
            role_id: roleId,
        }, ENV_CONFIG.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        return { user: foundUser, accessToken, refreshToken };
    }

    public async checkIsAuthenticated(userId: number) {
        const foundUser = await User.findById(userId).populate('role_id');

        if (!foundUser) {
            throw new UnauthorizedError('Korisnik nije prijavljen');
        }

        return foundUser;
    }
}
