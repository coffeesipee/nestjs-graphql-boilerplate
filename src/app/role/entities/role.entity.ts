import { Field, ObjectType } from '@nestjs/graphql';
import { ABaseEntity } from 'src/core/classes/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
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
