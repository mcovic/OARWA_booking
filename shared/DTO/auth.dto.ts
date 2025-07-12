import { UserDto } from './user.dto';

// ----------------------------------------------------------------------

export type LoginCredentialsDto = {
    username: string;
    password: string;
}

export type LoginResponseDto = {
    user: UserDto;
    accessToken: string;
    refreshToken: string;
}
