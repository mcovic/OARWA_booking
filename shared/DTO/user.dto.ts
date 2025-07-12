export type JwtAuthenticatedUserDto = {
    id: number;
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