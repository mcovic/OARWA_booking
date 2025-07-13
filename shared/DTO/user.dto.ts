export type JwtAuthenticatedUserDto = {
    id: string;
    role_id: number;
}

export type UserDto = {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    role_id: number;
}
export type UserRegisterDataDTO = {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
}

export type UserLoginDataDTO = {
    username: string;
    password: string;
}

