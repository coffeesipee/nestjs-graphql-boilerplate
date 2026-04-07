import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { GrantType } from '../consts/grant-type.const'
import { IsEmail, IsIn, IsNotEmpty, IsString, ValidateIf } from 'class-validator'

@ArgsType()
export class LoginDto {
  @Field(() => String)
  @IsString()
  @IsIn(Object.values(GrantType))
  @IsNotEmpty()
  grantType: GrantType

  @Field(() => String, { nullable: true })
  @ValidateIf((dto) => dto.grantType === GrantType.PASSWORD)
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Field(() => String, { nullable: true })
  @ValidateIf((dto) => dto.grantType === GrantType.PASSWORD)
  @IsNotEmpty()
  @IsString()
  password: string

  @Field(() => String, { nullable: true })
  @ValidateIf((dto) => dto.grantType === GrantType.REFRESH_TOKEN)
  @IsString()
  @IsNotEmpty()
  refreshToken: string
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
  authToken: AuthToken

  @Field(() => String)
  fullname: string

  @Field(() => String)
  role: string
}
