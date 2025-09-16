import { Field, ID, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
export class ABaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    @Field(() => Date)
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at'
    })
    @Field(() => Date, { nullable: true })
    deletedAt: Date;
}