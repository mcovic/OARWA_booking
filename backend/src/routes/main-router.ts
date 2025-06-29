import { Router } from 'express';

// --------------------------------------------------------------

export class MainRouter {
    // controllers // TODO import controllers as needed

    public readonly routes;

    constructor() {
        this.routes = Router();
        this.defineRoutes();
    }

    private defineRoutes() {} // TODO define routes here
}
