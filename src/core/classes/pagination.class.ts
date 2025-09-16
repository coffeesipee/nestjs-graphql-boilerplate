import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PaginationResponse {
    @Field(() => Int)
    total: number;

    @Field(() => Boolean)
    hasNextPage: boolean;

    @Field(() => Boolean)
    hasPreviousPage: boolean;

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    totalPages: number;

    public static constructResponse<T, U>(total: number, params: PaginationParams, items: T[]): U {
        const pagination = new PaginationResponse();

        pagination.total = total;

        const page = Math.max(1, params.page ?? 1);
        const limit = Math.max(1, params.limit ?? 10);
        const totalPages = Math.max(1, Math.ceil(total / limit));

        pagination.page = page;
        pagination.limit = limit;
        pagination.totalPages = totalPages;
        pagination.hasNextPage = page < totalPages;
        pagination.hasPreviousPage = page > 1;

        return {
            ...pagination,
            data: items
        } as U;
    }
}

export type OrderDirection = 'ASC' | 'DESC';

@ArgsType()
export class PaginationParams {
    @Field(() => Int, { nullable: true, defaultValue: 1 })
    page: number;

    @Field(() => Int, { nullable: true, defaultValue: 10 })
    limit: number;

    @Field(() => String, { nullable: true, defaultValue: 'id' })
    orderBy: string;

    @Field(() => String, { nullable: true, defaultValue: 'ASC' })
    order: OrderDirection;

    @Field(() => String, { nullable: true, defaultValue: 'id' })
    searchBy: string;

    @Field(() => String, { nullable: true, defaultValue: '' })
    search: string;
}
