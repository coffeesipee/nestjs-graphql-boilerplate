import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  TransactionCommitEvent,
} from 'typeorm'
import { Role } from '../entities/role.entity'

@EventSubscriber()
export class RoleSubscriber implements EntitySubscriberInterface<Role> {
  listenTo() {
    return Role
  }

  afterTransactionCommit(event: TransactionCommitEvent): Promise<any> | void {
  }
}
