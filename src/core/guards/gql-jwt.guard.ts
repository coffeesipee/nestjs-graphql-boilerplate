import { ExecutionContext, Injectable, SetMetadata, UseGuards } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlJwtGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}

export const UseGqlJwtGuard = () => UseGuards(GqlJwtGuard)

