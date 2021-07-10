import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm";
import { LocateUserEntity } from "./locationUser.entity";
import { StateEntity } from "./state.entity";

@Entity({ name: "city" })

export class CityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: String;

    @ManyToOne(type => StateEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "state_id" })
    state: StateEntity;

    @OneToMany(type => LocateUserEntity, location => location.user, { onDelete: "CASCADE" })
    @JoinColumn({ name: "city_id" })
    city: LocateUserEntity[];
}