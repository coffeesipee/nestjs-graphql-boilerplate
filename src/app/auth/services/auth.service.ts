import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JWTPayload } from '../dtos/jwt-payload.dto'
import { AuthToken, Login, LoginDto } from '../dtos/login.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../user/entities/user.entity'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { GrantType } from '../consts/grant-type.const'
import { Duration } from '../../../constants/duration.constant'
import { compareSync } from 'bcrypt'
import { InvalidCredentialException } from '../exceptions/invalid-credential.exception'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService
  ) { }

  // generate token
  private generateToken(payload: JWTPayload): AuthToken {
    const accessToken = this.jwtService.sign(payload, {
      privateKey: this.configService.get('auth.jwt.privateKey'),
    })
    const refreshToken = this.jwtService.sign({ ...payload, type: 'refresh' }, {
      expiresIn: this.configService.get('auth.jwt.refreshExpiresIn'),
      privateKey: this.configService.get('auth.jwt.privateKey'),
    })

    return { accessToken, refreshToken }
  }

  // login
  async login(payload: LoginDto): Promise<Login> {
    const { grantType, ...rest } = payload
    if (grantType === GrantType.PASSWORD) return this.loginWithPassword(rest.email, rest.password)
    if (grantType === GrantType.REFRESH_TOKEN) return this.loginWithRefreshToken(rest.refreshToken)

    throw new UnprocessableEntityException('Invalid grant type')
  }

  private async loginWithPassword(email: string, password: string): Promise<Login> {
    const user = await this.userRepository.findOne({
      where: {
        email,
        isActive: true,
      },
      select: ['id', 'email', 'password', 'roleId', 'fullname'],
      relations: ['role'],
      cache: Duration.ONE_HOUR,
    })
    if (!user) throw new InvalidCredentialException()

    if (!compareSync(password, user.password)) throw new InvalidCredentialException()

    return {
      authToken: this.generateToken({
        userId: user.id,
        roleId: user.roleId,
        fullname: user.fullname,
        email: user.email,
      }),
      fullname: user.fullname,
      role: user.role.name,
    }
  }

  private async loginWithRefreshToken(refreshToken: string): Promise<Login> {
    const validity = this.jwtService.verify<JWTPayload & { type: 'refresh' }>(refreshToken, {
    })

    if (!validity) throw new UnauthorizedException(`Invalid refresh token`)

    if (validity.type !== 'refresh') throw new UnauthorizedException(`Invalid refresh token`)

    const { accessToken } = this.generateToken({
      email: validity.email,
      userId: validity.userId,
      roleId: validity.roleId,
      fullname: validity.fullname,
    })

    const user = await this.userRepository.findOne({
      where: {
        id: validity.userId,
        isActive: true,
      },
      select: ['id', 'email', 'password', 'roleId', 'fullname'],
      relations: ['role'],
      cache: Duration.ONE_HOUR,
    })

    return {
      authToken: { accessToken, refreshToken },
      fullname: user.fullname,
      role: user.role.name,
    }
  }
}
