import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoleDto {
  @Field(() => String)
  name: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  isActive: boolean;
}
