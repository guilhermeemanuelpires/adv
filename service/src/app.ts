import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as path from "path";

//importando arquivo de rota
import userRouter from "./routers/user.router";
import loginRouter from "./routers/login.router";
import category from "./routers/category.router";
import locationRouter from "./routers/location.router";

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    //Carrega os middleware da aplicação
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(cors());
    }

    private routes(): void {
        this.express.use("/user", userRouter);
        this.express.use("/login", loginRouter);
        this.express.use(
            "/uploads",
            express.static(path.join(__dirname, "..", "uploads"))
        );
        this.express.use("/category", category);
        this.express.use("/findUsersLocation", locationRouter);
    }
}

export default new App().express;