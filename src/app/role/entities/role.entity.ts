import { Field, ObjectType } from '@nestjs/graphql'
import { WithCreatedByAndUpdatedBy } from '../../../core/classes/base.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { User } from '../../user/entities/user.entity'

@Entity({ name: 'roles' })
@ObjectType()
export class Role extends WithCreatedByAndUpdatedBy {
  @Field(() => String)
  @Column()
  name: string

  @Field(() => String, { nullable: true })
  @Column()
  code: string

  @Field(() => Boolean)
  @Column({
    name: 'is_active',
  })
  isActive?: boolean

  @OneToMany(() => User, (user) => user.role)
  users: User[]
}
