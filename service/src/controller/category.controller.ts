import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CategoryEntity } from "../entity/category.entity";

class CategoryController {
    public async findAll(req: Request, res: Response) {
        try {
            const category = await getRepository(CategoryEntity).find();

            console.log(category);

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
}

export default new CategoryController();