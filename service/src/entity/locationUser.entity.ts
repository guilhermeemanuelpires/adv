import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import { UserEntity } from "./user.entity";
import { CityEntity } from "./city.entity";

@Entity("location_user")
export class LocateUserEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    description: string;

    @Column()
    publicPlace: string;

    @Column()
    street: string;

    @Column({ type: "double" })
    latitude: Number;

    @Column({ type: "double" })
    longitude: Number;

    @ManyToOne(type => UserEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: UserEntity;

    @ManyToOne(type => CityEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "city_id" })
    city: CityEntity;
}
