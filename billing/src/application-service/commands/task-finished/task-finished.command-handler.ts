import { EntityManager } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as moment from 'moment';
import { AccountFinishedTask } from '../../../enitities/account-finished-task.entity';
import { Account } from '../../../enitities/account.entity';
import { Task } from '../../../enitities/task.entity';
import { UuidGenerator } from '../../../infrastructure/uuid.generator';
import { TaskFinishedCommand } from './task-finished.command';

@CommandHandler(TaskFinishedCommand)
export class TaskFinishedCommandHandler
  implements ICommandHandler<TaskFinishedCommand>
{
  private _logger = new Logger(TaskFinishedCommandHandler.name);

  constructor(private readonly em: EntityManager) {}

  public async execute(command: TaskFinishedCommand): Promise<void> {
    const em = this.em.fork();
    this._logger.log(command.task);
    const task = await em.findOne(Task, { id: command.task.id });
    let currentAccount = await em.findOne(Account, {
      assigner: command.task.assigner,
      close: false,
    });
    this._logger.debug({ currentAccount });

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

    const finishedTask = em.create(AccountFinishedTask, {
      account: currentAccount.id,
      task: task.id,
    });

    em.persist(finishedTask);

    currentAccount.finishedTasks.add(finishedTask);
    currentAccount.balance = currentAccount.balance + task.priceFinish;
    currentAccount.finishSum =
      task.priceFinish + (currentAccount.finishSum || 0);

    if (
      currentAccount?.mostExpensiveTask < task.priceFinish ||
      !currentAccount.mostExpensiveTask
    ) {
      currentAccount.mostExpensiveTask = task.priceFinish;
    }

    if (
      currentAccount?.mostChipTask > task.priceFinish ||
      !currentAccount.mostChipTask
    ) {
      currentAccount.mostChipTask = task.priceFinish;
    }

    await em.flush();
  }
}
