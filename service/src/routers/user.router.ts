import { Router } from "express";
import * as multer from "multer";
import userController from "../controller/user.controller";
// import validToken from "../middlewares/auth.middlewares";
import uploadConfig from "../utils/upload";
const upload = multer(uploadConfig);

class Routes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.post("/", upload.array("images"), userController.create);
        this.router.put(
            "/editImage/:id([0-9]+)",
            upload.array("images"),
            [],
            userController.updateImage
        );
        this.router.put(
            "/:id([0-9]+)",
            [],
            userController.update
        );
        this.router.get(
            "/:id([0-9]+)",
            [],
            userController.findById
        );
    }
}

export default new Routes().router;
