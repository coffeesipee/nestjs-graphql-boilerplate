import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const UserInfo = createParamDecorator((data, context: ExecutionContext) => {
    const req = GqlExecutionContext.create(context).getContext().req

    return req?.user
})