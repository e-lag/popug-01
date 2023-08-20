import { TaskStatuses } from '../../../enums/task-statuses.enum';

export type TaskStreamDto = {
  id: string;
  title: string;
  description: string;
  assigner: string;
  priceAssign: number;
  priceFinish: number;
  status: TaskStatuses;
  createdAt: Date;
  updatedAt: Date;
};
