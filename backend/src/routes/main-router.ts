import { authMiddleware } from '@middleware/auth-middleware';
import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller';
import { ReservationController } from '../controllers/reservation-controller';

// --------------------------------------------------------------

export class MainRouter {
    // controllers
    private readonly authController = new AuthController();
    private readonly reservationController = new ReservationController();

    public readonly routes;

    constructor() {
        this.routes = Router();
        this.defineRoutes();
    }

    private defineRoutes() {
        this.routes.use(this.authController.authRouter);
        this.routes.use('/reservations', authMiddleware, this.reservationController.reservationRouter);
    }
}
