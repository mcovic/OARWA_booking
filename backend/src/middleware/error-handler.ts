import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http-error';

// --------------------------------------------------------------

export function errorHandler(
    error: Error,
    _: Request,
    res: Response,
    __: NextFunction
): void {
    if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
    } else {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}