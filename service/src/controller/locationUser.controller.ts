import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { LocateUserEntity } from "../entity/locationUser.entity";
import { UserEntity } from "../entity/user.entity";

class LocationUserController {
    public async findAll(req: Request, res: Response) {
        try {

            const locationsUsers = await getRepository(UserEntity)
                .createQueryBuilder("user")
                .innerJoinAndSelect("user.locations", "locations")
                .leftJoinAndSelect("user.images", "images")
                .getMany();

            if (!locationsUsers) {
                return res.status(404).send({ error: "Usuário não encontrado" });;
            }

            res.send({ locationsUsers });

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}

export default new LocationUserController();