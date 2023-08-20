export type TaskAdd = {
  title: string;
  description: string;
};

export class TaskCreateCommand {
  constructor(public readonly task: TaskAdd) {}
}
