import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { LocateUserEntity } from "../entity/locationUser.entity";
import { UserEntity } from "../entity/user.entity";
import axios from "axios";
import { CityEntity } from "../entity/city.entity";
import { StateEntity } from "../entity/state.entity";

const MapBox = axios.create({
    baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
});

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

    public async create(req: Request, res: Response) {
        const id = req.params.id;
        let endereco = req.body;

        try {
            const user = await getRepository(UserEntity).findOne(id);

            if (!user) {
                return res.status(404).send({ error: "Usúario não encontrado!" });
            }

            Object.assign(endereco, { user: user.id });

            if (!endereco.city) {
                return res.status(404).send({ error: "Cidade não vinculada!" });
            }

            const city = await getRepository(CityEntity)
                .createQueryBuilder("city")
                .innerJoinAndSelect("city.state", "state")
                .where(`city.id = :id`)
                .setParameter('id', endereco.city)
                .getOne();

            // Carrega endereço
            const endPoint = `${endereco.street}, ${endereco.number}, ${endereco.publicPlace}, ${city.name} - ${city.state.name}.json?access_token=${process.env.KEY_MAPBOX}`;

            await MapBox.get(endPoint)
                .then((resp) => {
                    const { features } = resp.data;
                    const { coordinates } = features[0].geometry
                    Object.assign(endereco, { longitude: coordinates[0], latitude: coordinates[1] });
                })
                .catch((err) => {
                    console.log(err);
                    res.send({ error: "Erro ao carregar a localização, verefique se seu endereço esta correto!" })
                });

            await getRepository(LocateUserEntity).save(endereco);

            res.status(200).send(endereco);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    }

    public async states(req: Request, res: Response) {
        try {
            const stats = await getRepository(StateEntity).find();
            res.status(200).send(stats);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    public async citys(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const citys = await getRepository(CityEntity)
                .createQueryBuilder()
                .where("state_id = :id", { id: id })
                .getMany();

            res.status(200).send(citys);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}

export default new LocationUserController();