import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class UserResolver {
    constructor() { }

    @Query(() => String)
    hello() {
        return 'hello'
    }
}