import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller';

// --------------------------------------------------------------

export class MainRouter {
    // controllers
    private readonly authController = new AuthController();

    public readonly routes;

    constructor() {
        this.routes = Router();
        this.defineRoutes();
    }

    private defineRoutes() {
        this.routes.use(this.authController.authRouter);
    }
}
