import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '../entities/role.entity';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { ListRole } from '../dtos/list-role.dto';
import { PaginationParams } from 'src/core/classes/pagination.class';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  async createRole(@Args('role') role: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(role);
  }

  @Query(() => ListRole)
  async findAllRoles(@Args() pagination: PaginationParams): Promise<ListRole> {
    return this.roleService.findAll(pagination);
  }
}
