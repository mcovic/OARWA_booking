import { ENV_CONFIG } from '@config/default';
import { JwtAuthenticatedUserDto } from '@shared/DTO/user.dto';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// --------------------------------------------------------------

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader)
        return res.sendStatus(401);

    const token = authHeader?.split(' ')[1];

    jwt.verify(
        token,
        ENV_CONFIG.ACCESS_TOKEN_SECRET,
        // @ts-ignore
        (err: Error, decoded: JwtAuthenticatedUserDto) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = decoded;
            next();
        },
    );

}

export {
    authMiddleware,
};
