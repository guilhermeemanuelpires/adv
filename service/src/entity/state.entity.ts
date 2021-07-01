import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn
} from "typeorm";

import { CityEntity } from "./city.entity";
@Entity({ name: "state" })

export class StateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    uf: String;

    @Column()
    name: String;

    @OneToMany(type => CityEntity, City => City.state, { onDelete: "CASCADE" })
    @JoinColumn({ name: "state_id" })
    state: CityEntity[];
}