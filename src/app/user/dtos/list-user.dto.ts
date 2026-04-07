import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from '../../../core/classes/pagination.class';
import { User } from '../entities/user.entity';

@ObjectType()
export class ListUser extends PaginationResponse {
  @Field(() => [User])
  data: User[];
}
