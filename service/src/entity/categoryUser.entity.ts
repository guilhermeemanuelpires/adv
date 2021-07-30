import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { CategoryEntity } from "./category.entity";

@Entity({ name: "category_user" })

export class CategoryUserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => UserEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: UserEntity;

    @ManyToOne(type => CategoryEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "category_id" })
    categorys: CategoryEntity;
}