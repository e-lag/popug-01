import { TaskStatuses } from './task-statuses.enum';

export type TaskDto = {
  id: string;
  title: string;
  description: string;
  assignerId: string;
  price: string;
  status: TaskStatuses;
  createdAt: Date;
  updatedAt: Date;
};
