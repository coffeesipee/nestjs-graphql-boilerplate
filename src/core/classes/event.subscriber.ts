import { ClassConstructor } from 'class-transformer'
import { EntitySubscriberInterface, TransactionCommitEvent } from 'typeorm'

export abstract class AEventSubscriber<T extends ClassConstructor<any>>
  implements EntitySubscriberInterface
{
  constructor(entityClass: T) {
    this.entityClass = entityClass
  }

  private entityClass: T

  listenTo() {
    return this.entityClass
  }


  protected abstract onCommit(e: any)

}
