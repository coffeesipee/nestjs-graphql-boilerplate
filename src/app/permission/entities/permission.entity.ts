import { Field, ObjectType } from "@nestjs/graphql";
import { WithCreatedByAndUpdatedBy } from "../../../core/classes/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
@ObjectType()
export class Permission extends WithCreatedByAndUpdatedBy {
    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    code: string;

    @Column({
        name: 'is_active'
    })
    @Field(() => Boolean)
    isActive: boolean;

    @Column()
    @Field(() => String, { nullable: true })
    description?: string;
}