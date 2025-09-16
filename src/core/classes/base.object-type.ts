import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class OkObjectType {
    @Field(() => Boolean)
    ok: boolean;
}