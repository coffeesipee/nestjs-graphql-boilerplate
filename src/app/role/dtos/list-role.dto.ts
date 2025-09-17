import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from 'src/core/classes/pagination.class';
import { Role } from '../entities/role.entity';

@ObjectType()
export class ListRole extends PaginationResponse {
  @Field(() => [Role])
  data: Role[];
}
