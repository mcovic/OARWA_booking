import { RoleEnum } from '@shared/enums/RoleEnum';
import { NextFunction, Request, Response } from 'express';
import Role from '../models/Role';

// --------------------------------------------------------------

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role_id) {
        const role = await Role.findById({ _id: req.user.role_id });

        if (role?.id === RoleEnum.ADMIN) {
            next();
            return;
        }
    }

    return res.status(403).json({ error: 'Access denied' });
}

export { adminMiddleware };
