import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { GrantType } from '../consts/grant-type.const'
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator'

@ArgsType()
export class LoginDto {
  @Field(() => GrantType)
  @IsString()
  @IsIn(Object.values(GrantType))
  @IsNotEmpty()
  grantType: string

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  password: string
}

@ObjectType()
export class AuthToken {
  @Field(() => String)
  accessToken: string

  @Field(() => String)
  refreshToken: string
}

@ObjectType()
export class Login {
  @Field(() => AuthToken)
  authToken: string

  @Field(() => String)
  fullname: string

  @Field(() => String)
  role: string
}
