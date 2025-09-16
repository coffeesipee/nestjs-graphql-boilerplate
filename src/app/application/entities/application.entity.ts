import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { ABaseEntity } from "../../../core/classes/base.entity";
import { Column, Entity } from "typeorm";
import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
import { Exclude } from 'class-transformer'

@Entity()
@ObjectType()
@ArgsType()
export class Application extends ABaseEntity {
    @Column()
    @Field(() => String, { nullable: true })
    code?: string;

    @Column()
    @Field(() => String)
    @IsNotEmpty()
    name: string;

    @Column()
    @Field(() => String, { nullable: true })
    @IsOptional()
    description?: string;

    @Column()
    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    @IsOptional()
    logo?: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    @IsOptional()
    url?: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    @Exclude()
    api_key?: string;
}
