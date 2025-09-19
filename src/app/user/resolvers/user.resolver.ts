import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from '../services/user.service'
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dtos/create-user.dto'
import { ListUser } from '../dtos/list-user.dto'
import { PaginationParams } from 'src/core/classes/pagination.class'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User)
  async createUser(@Args('payload') payload: CreateUserDto) {
    return this.userService.register(payload)
  }

  @Query(() => User)
  async findUserById(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOneById(id)
  }

  @Query(() => ListUser)
  async findAllUsers(@Args() pagination: PaginationParams) {
    return this.userService.findAll(pagination)
  }

}
