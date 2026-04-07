import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
export class ABaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id?: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    @Field(() => Date)
    createdAt?: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    @Field(() => Date)
    updatedAt?: Date;

    @DeleteDateColumn({
        name: 'deleted_at'
    })
    @Field(() => Date, { nullable: true })
    deletedAt?: Date;
}

@ObjectType()
export class WithCreatedByAndUpdatedBy extends ABaseEntity {
    @Column({
        name: 'created_by'
    })
    @Field(() => ID, { nullable: true })
    createdBy: string;

    @Column({
        name: 'updated_by'
    })
    @Field(() => ID, { nullable: true })
    updatedBy: string;
}
