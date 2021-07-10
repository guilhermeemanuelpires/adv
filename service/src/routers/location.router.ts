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
        this.router.get("/citys", LocationController.citys);
        this.router.get("/states", LocationController.states);
        this.router.post("/register/:id([0-9]+)", LocationController.create);
    }
}

export default new Routes().router;