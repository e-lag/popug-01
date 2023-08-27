import { EntityManager } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as moment from 'moment';
import { AccountAssignedTask } from '../../../enitities/account-assigned-task.entity';
import { Account } from '../../../enitities/account.entity';
import { UuidGenerator } from '../../../infrastructure/uuid.generator';
import { TaskAssignedCommand } from './task-assigned.command';

@CommandHandler(TaskAssignedCommand)
export class TaskAssignedCommandHandler
  implements ICommandHandler<TaskAssignedCommand>
{
  private _logger = new Logger(TaskAssignedCommandHandler.name);

  constructor(private readonly em: EntityManager) {}

  public async execute(command: TaskAssignedCommand): Promise<void> {
    // this._logger.log({ command });
    this._logger.log(command.task.id);
    const em = this.em.fork();
    // const task = await em.findOne(Task, { id: command.task.id });

    let currentAccount = await em.findOne(Account, {
      assigner: command.task.assigner,
      close: false,
    });
    if (!currentAccount) {
      currentAccount = em.create(Account, {
        id: UuidGenerator.generate(),
        day: moment().startOf('day').toDate(),
        assigner: command.task.assigner,
        balance: 0,
        close: false,
        paid: false,
        reportSend: false,
      });
      em.persist(currentAccount);
    }
    const assignedTask = em.create(AccountAssignedTask, {
      account: currentAccount.id,
      task: command.task.id,
    });
    em.persist(assignedTask);
    currentAccount.assignedTasks.add(assignedTask);
    currentAccount.balance = currentAccount.balance - command.task.priceAssign;
    currentAccount.assignSum =
      (currentAccount.assignSum || 0) + command.task.priceAssign;
    await em.flush();
  }
}
