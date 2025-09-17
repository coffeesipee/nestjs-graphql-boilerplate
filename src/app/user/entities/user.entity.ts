import { Field, ObjectType } from '@nestjs/graphql';
import { ABaseEntity } from 'src/core/classes/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class User extends ABaseEntity {
  @Column()
  @Field(() => String)
  email: string;

  @Column({
    select: false,
  })
  @Field(() => String, { nullable: true })
  password: string;

  @Column()
  @Field(() => String)
  fullname: string;

  @Column({
    name: 'verified_at',
  })
  @Field(() => Date, { nullable: true })
  verifiedAt: Date;

  @Column({
    name: 'is_active',
  })
  @Field(() => Boolean)
  isActive: boolean;
}
