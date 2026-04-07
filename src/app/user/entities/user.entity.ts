import { Field, ObjectType } from '@nestjs/graphql';
import { WithCreatedByAndUpdatedBy } from '../../../core/classes/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User extends WithCreatedByAndUpdatedBy {
  @Column()
  @Field(() => String)
  email: string;

  @Column({
    select: false,
  })
  @Field(() => String, { nullable: true })
  password: string;

  @Column({
    name: 'role_id',
  })
  @Field(() => String)
  roleId: string;

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

  @ManyToOne(() => Role)
  @JoinColumn({
    name: 'role_id',
  })
  role: Role
}
