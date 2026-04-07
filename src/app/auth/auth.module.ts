import { Module } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { AuthResolver } from './resolvers/auth.resolver'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './strategies/jwt.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        signOptions: { expiresIn: config.get('auth.jwt.expiresIn'), algorithm: 'RS256' },
        privateKey: config.get('auth.jwt.privateKey'),
        publicKey: config.get('auth.jwt.publicKey'),
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
