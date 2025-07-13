import { UserDto } from './user.dto';

// -----------------------------------------------------------------

export type ReservationDto = {
    _id: string;
    date: Date;
    user_id: string | UserDto;
}