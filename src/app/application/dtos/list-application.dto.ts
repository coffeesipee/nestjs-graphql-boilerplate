import { ObjectType } from "@nestjs/graphql";
import { PaginationResponse } from "src/core/classes/pagination.class";
import { Application } from "../entities/application.entity";
import { Field } from "@nestjs/graphql";

@ObjectType()
export class ListApplication extends PaginationResponse {
    @Field(() => [Application])
    data: Application[];
}