import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { toSlug } from 'src/core/utils/strings';
import { CreateRoleDto } from '../dtos/create-role.dto';
import {
  PaginationParams,
  PaginationResponse,
} from 'src/core/classes/pagination.class';
import { ListRole } from '../dtos/list-role.dto';
import { normalize } from 'path';
import { normalizePageParams } from 'src/core/utils/pagination';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(payload: CreateRoleDto): Promise<Role> {
    // Convert name to slug
    const role = this.roleRepository.create(payload);
    role.code = toSlug(role.name);

    const codeExists = await this.findRoleByCode(role.code);
    if (codeExists) {
      throw new UnprocessableEntityException('Role code already exists');
    }

    return this.roleRepository.save(role);
  }

  async findRoleByCode(code: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { code } });
  }

  async findAll(pagination: PaginationParams): Promise<ListRole> {
    const { skip, take } = normalizePageParams(pagination);

    const [data, total] = await this.roleRepository.findAndCount({
      skip,
      take,
      cache: true,
    });

    return PaginationResponse.constructResponse<Role, ListRole>(
      total,
      pagination,
      data,
    );
  }
}
