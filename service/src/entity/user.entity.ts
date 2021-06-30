import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn,
    JoinTable,
} from "typeorm";

import Image from "./imageUser.entity";
import { CategoryUserEntity } from "./categoryUser.entity";
import { LocateUserEntity } from "./locationUser.entity";


@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 28 })
    fullName: string;

    @Column({ nullable: false })
    cpf: String;

    @Column({ nullable: false })
    email: String;

    @Column({ nullable: false })
    phone: String;

    @Column({ nullable: false })
    password: String;

    @Column({ nullable: false })
    resetToken: String;

    @Column({ nullable: false, type: "datetime" })
    dataReset: Date;

    @OneToMany(() => Image, (image) => image.user, {
        cascade: ["insert", "update"],
    })
    @JoinColumn({ name: "user_id" })
    images: Image[];

    @OneToMany(type => CategoryUserEntity, category => category.user, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    category: CategoryUserEntity[];

    @OneToMany(type => LocateUserEntity, location => location.user, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    locations: LocateUserEntity[];
}
