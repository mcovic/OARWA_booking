import { UserDto } from './user.dto';

// -----------------------------------------------------------------

export type ReservationDto = {
    date: Date;
    user_id: string | UserDto;
}