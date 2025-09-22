import { Field, ObjectType } from '@nestjs/graphql';
import { ABaseEntity } from '../../../core/classes/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'roles' })
@ObjectType()
export class Role extends ABaseEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column()
  code: string;

  @Field(() => Boolean)
  @Column({
    name: 'is_active',
  })
  isActive?: boolean;
}
