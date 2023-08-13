import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Account } from '../../../enitities/account.entity';
import { Task } from '../../../enitities/task.entity';
import { UuidGenerator } from '../../../infrastructure/uuid.generator';
import { TaskFinishedCommand } from './task-finished.command';

@CommandHandler(TaskFinishedCommand)
export class TaskFinishedCommandHandler
  implements ICommandHandler<TaskFinishedCommand>
{
  constructor(private readonly em: EntityManager) {}

  public async execute(command: TaskFinishedCommand): Promise<void> {
    const task = await this.em.findOne(Task, { id: command.task.id });
    let currentAccount = await this.em.findOne(Account, {
      assigner: command.task.assigner,
      close: false,
    });
    if (!currentAccount) {
      currentAccount = this.em.create(Account, {
        id: UuidGenerator.generate(),
        day: new Date(),
        assigner: command.task.assigner,
        balance: 0,
        close: false,
        paid: false,
        reportSend: false,
      });
      this.em.persist(currentAccount);
    }
    currentAccount.assignedTasks.add(task);
    currentAccount.balance = currentAccount.balance - task.priceAssign;
    await this.em.flush();
  }
}
