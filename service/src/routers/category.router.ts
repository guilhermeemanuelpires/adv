import { Router } from "express";
import CategoryController from "../controller/category.controller";

class Routes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.get("/", CategoryController.findAll);
    }
}

export default new Routes().router;