export class Task {
  constructor(
      public title: string,
      public description: string,
      public dueDate: Date,
      public status: 'not started' | 'in progress' | 'completed',
      public assigneeId: string,
      public projectId: string,
      public id?: string
  ) {}
}
