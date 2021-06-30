import { Router } from "express";
import LocationController from "../controller/locationUser.controller";

class Routes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.get("/", LocationController.findAll);
    }
}

export default new Routes().router;