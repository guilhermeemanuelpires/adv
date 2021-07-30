import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { CategoryEntity } from "../entity/category.entity";
import { CategoryUserEntity } from "../entity/categoryUser.entity";
import { UserEntity } from "../entity/user.entity";

class CategoryController {
    public async findAll(req: Request, res: Response) {
        try {
            const category = await getRepository(CategoryEntity).find();

            if (category) {
                return res.status(200).send({ category: category });
            } else {
                return res.status(200).send({ category: "Empty" });
            }

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const categorys = req.body;

            const user = await getRepository(UserEntity).findOne(id);

            if (!user) {
                return res.status(404).send({ error: "Usúario não encontrado!" });
            }

            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(CategoryUserEntity)
                .where("userid = :id", { id: id })
                .execute();

            await getRepository(CategoryUserEntity).save(categorys);

            res.status(200).send(categorys);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    public async findById(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const user = await getRepository(UserEntity).findOne(id);

            if (!user) {
                return res.status(404).send({ error: "Usúario não encontrado!" });
            }

            const categorys = await getRepository(CategoryUserEntity)
                .find();

            res.status(200).send(categorys);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}

export default new CategoryController();