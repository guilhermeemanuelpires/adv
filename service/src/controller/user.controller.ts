import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UserEntity } from "../entity/user.entity";
// import { UserBalanceEntity } from "../entity/userBalance.entity";
import GenToken from "../utils/generateToken";
import Image from "../entity/imageUser.entity";
import * as path from "path";
import ImagesViewUser from "../views/ImagesViewUser";
const bcrypt = require("bcryptjs");
const fs = require("fs");

class UsuarioController {

    public async create(req: Request, res: Response) {
        try {
            let user = req.body;

            // Valida se o CPF já esta em Utilização
            const cpfExists = await getRepository(UserEntity).findOne({
                where: [{ cpf: user.cpf }],
            });

            if (cpfExists) {
                return res.status(406).send({ error: "O CPF já está em utilização!" });
            }

            // Valida se o E-mail já esta em Utilização
            const emailExists = await getRepository(UserEntity).findOne({
                where: [{ email: user.email }],
            });

            if (emailExists) {
                return res.status(406).send({ error: "E-mail já está em utilização!" });
            }

            // criptografar senha antes mesmo de inserir ao banco
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);

            user.resetToken = "";
            user.dataReset = new Date();

            // Salva Usuario
            await getRepository(UserEntity).save(user);

            const dataImage = {
                user: user.id,
                path: "userDefault.png",
            };

            await getRepository(Image).save(dataImage);

            const token = GenToken.generatorToken({ id: user.id });

            const url = `http://${process.env.IP}/uploads/${dataImage.path}`;

            return res.status(202).send({ user, token, url });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const novo = req.body;

        try {
            //Busca registro pelo ID
            const user = await getRepository(UserEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!user) {
                res.status(404).send({ error: "Usuário não encontrado" });
                return;
            }
            // Não atualiza senha nesse metodo!
            delete novo["password"];

            await getRepository(UserEntity).update(user.id, novo);

            //Atualiza ID do novo
            novo.id = user.id;

            res.send(novo);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async findById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            //Busca registro pelo ID
            const user = await getRepository(UserEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!user) {
                res.status(404).send({ error: "Usuário não encontrado" });
                return;
            }

            //Carrega pontuação do usuário
            // const balanceData = await getRepository(UserBalanceEntity)
            //     .createQueryBuilder()
            //     .where("userid = :userid")
            //     .setParameters({ userid: id })
            //     .getMany(); * /

            let balance = [];
            // if (balanceData) {
            //     balance = balanceData;
            // }

            res.send({ user, balance });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async updateImage(req: Request, res: Response) {

        try {
            const id = req.params.id;

            // Busca o Usuario para ter certeza que ele existe!
            const user = await getRepository(UserEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!user) {

                // Delete a imagem que subiu mas não sera utilizada
                const requestImages = req.files as Express.Multer.File[];

                const images = requestImages.map((image) => {
                    // return { path: image.filename };
                    fs.unlink(`${path.join(__dirname, "..", "..", "uploads")}/${image.filename}`, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                });

                return res.status(404).send({ error: "Usuário não encontrado" });

            } else {

                const requestImages = req.files as Express.Multer.File[];

                const images = requestImages.map((image) => {
                    return { path: image.filename };
                });

                const pathImage = await getRepository(Image)
                    .createQueryBuilder()
                    .where("user_id = :id", { id: id })
                    .getOne();

                if (pathImage) {
                    const pathComplete = path.join(__dirname, "..", "..", "uploads");

                    if (pathImage.path != "userDefault.png") {
                        fs.unlink(`${pathComplete}/${pathImage.path}`, (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    }

                    await getRepository(Image)
                        .createQueryBuilder()
                        .update()
                        .set({
                            path: images[0].path,
                        })
                        .where("user_id = :id", { id: id })
                        .execute();

                } else {
                    const dataImage = {
                        user: user,
                        path: images[0].path
                    };

                    await getRepository(Image).save(dataImage);
                }

                const result = await getRepository(Image)
                    .createQueryBuilder()
                    .where("user_id = :id", { id: id })
                    .getOne();

                return res.send(ImagesViewUser.render(result));
            }

        } catch (error) {


            res.status(500).send(error);
        }
    }
}

export default new UsuarioController();
