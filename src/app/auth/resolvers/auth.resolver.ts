import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity';
import { AuthService } from '../../auth/services/auth.service';
import { UseGqlJwtGuard } from '../../../core/guards/gql-jwt.guard';
import { UserInfo } from '../../../core/decorators/userinfo.decorator';
import { Login, LoginDto } from '../dtos/login.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
  ) { }

  // login
  @Mutation(() => Login)
  async login(
    @Args() payload: LoginDto
  ) {
    return this.authService.login(payload)
  }

  // profile
  @Mutation(() => User)
  @UseGqlJwtGuard()
  me(
    @UserInfo() user: User
  ) {
    return user
  }

  // refresh token
}
