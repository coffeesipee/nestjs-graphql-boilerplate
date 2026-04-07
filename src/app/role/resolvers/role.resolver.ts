import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '../entities/role.entity';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { ListRole } from '../dtos/list-role.dto';
import { PaginationParams } from '../../../core/classes/pagination.class';
import { UseGqlJwtGuard } from '../../../core/guards/gql-jwt.guard';
import { UserInfo } from '../../../core/decorators/userinfo.decorator';
import { JWTPayload } from '../../auth/dtos/jwt-payload.dto';
import { OkObjectType } from '../../../core/classes/base.object-type';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) { }

  @Mutation(() => Role)
  @UseGqlJwtGuard()
  async createRole(@Args('role') role: CreateRoleDto, @UserInfo() { userId }: JWTPayload): Promise<Role> {
    const created = await this.roleService.createRole({ ...role, createdBy: userId, updatedBy: userId });

    return created
  }

  @Query(() => ListRole)
  async findAllRoles(@Args() pagination: PaginationParams): Promise<ListRole> {
    return this.roleService.findAll(pagination);
  }

  @Mutation(() => OkObjectType)
  @UseGqlJwtGuard()
  async deleteRole(@Args('id') id: string, @UserInfo() { userId }: JWTPayload): Promise<OkObjectType> {
    await this.roleService.deleteRoleById(id, userId);

    return { ok: true }
  }
}
