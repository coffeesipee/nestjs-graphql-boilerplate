import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import { Repository } from 'typeorm'
import {
  PaginationParams,
  PaginationResponse,
} from 'src/core/classes/pagination.class'
import { normalizePageParams } from 'src/core/utils/pagination'
import { CreateUserDto } from '../dtos/create-user.dto'
import { randomString } from 'src/core/utils/strings'
import { genSaltSync, hashSync } from 'bcrypt'
import { isEmpty } from 'class-validator'
import { ListUser } from '../dtos/list-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(user: CreateUserDto) {
    const userExists = await this.findOneByEmail(user.email)

    if (userExists) {
      throw new UnprocessableEntityException('User already exists')
    }

    const payload = this.userRepository.create(user)
    if (user.autoVerified) {
      payload.verifiedAt = new Date()
    }

    let userPassword = user.password
    if (isEmpty(user.password)) {
      userPassword = randomString(10)
      user.password = hashSync(userPassword, genSaltSync(12))
    }

    const created = await this.userRepository.save(payload)

    if (!user.password) {
      return {
        ...created,
        password: userPassword,
      }
    }

    delete created.password
    return created
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }

  async findOneById(id: string) {
    return await this.userRepository.findOne({ where: { id } })
  }

  async findAll(pagination: PaginationParams): Promise<ListUser> {
    const { skip, take } = normalizePageParams(pagination)

    const query = this.userRepository.createQueryBuilder('user')

    const [data, total] = await query.skip(skip).take(take).getManyAndCount()
    return PaginationResponse.constructResponse<User, ListUser>(
      total,
      pagination,
      data,
    )
  }

  async update(id: string, user: User) {
    return await this.userRepository.update(id, user)
  }

  async delete(id: string) {
    return await this.userRepository.delete(id)
  }
}
