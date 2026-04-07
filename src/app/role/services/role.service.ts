import {
  Inject,
  Injectable,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from '../entities/role.entity'
import { Repository } from 'typeorm'
import { toSlug } from '../../../core/utils/strings'
import { CreateRoleDto } from '../dtos/create-role.dto'
import {
  PaginationParams,
  PaginationResponse,
} from '../../../core/classes/pagination.class'
import { ListRole } from '../dtos/list-role.dto'
import { normalizePageParams } from '../../../core/utils/pagination'
import { AuditTrailService } from '../../audit-trail/services/audit-trail.service'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'

@Injectable({ scope: Scope.REQUEST })
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly auditTrailService: AuditTrailService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async createRole(payload: CreateRoleDto): Promise<Role> {
    // Convert name to slug
    const role = this.roleRepository.create(payload)
    role.code = toSlug(role.name)

    const codeExists = await this.findRoleByCode(role.code)
    if (codeExists) {
      throw new UnprocessableEntityException('Role code already exists')
    }

    return this.roleRepository.save(role)
  }

  async findRoleByCode(code: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { code } })
  }

  async findAll(pagination: PaginationParams): Promise<ListRole> {
    const { skip, take } = normalizePageParams(pagination)

    const [data, total] = await this.roleRepository.findAndCount({
      skip,
      take,
      cache: true,
    })

    return PaginationResponse.constructResponse<Role, ListRole>(
      total,
      pagination,
      data,
    )
  }

  async deleteRoleById(id: string, updatedBy: string): Promise<void> {
    const role = await this.roleRepository.findOne({ where: { id } })

    this.auditTrailService.createAuditTrailEntry({
      resourceName: Role.name,
      action: 'delete',
      beforeEntity: role,
      afterEntity: null,
      userinfo: {
        userId: updatedBy,
      },
      reqBody: null,
      reqHeaders: null,
      reqUrl: null,
      reqMethod: null,
      timestamp: new Date(),
      userIp: this.request.ip,
    })

    role.updatedBy = updatedBy
    role.deletedAt = new Date()

    await this.roleRepository.save(role)
  }
}
