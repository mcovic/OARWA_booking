import { JwtAuthenticatedUserDto } from '@shared/DTO/user.dto';

// --------------------------------------------------------------

declare global {
    namespace Express {
        interface Request {
            user?: JwtAuthenticatedUserDto;
        }
    }
}

export {};