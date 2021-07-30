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
        this.router.post("/:id([0-9]+)", CategoryController.create);
        this.router.get("/:id([0-9]+)", CategoryController.findById);
    }
}

export default new Routes().router;
