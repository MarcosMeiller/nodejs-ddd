export class Project {
    constructor(
      public title: string,
      public description: string,
      public dueDate: Date,
      public status: 'not started' | 'in progress' | 'completed',
      public members: string[],
      public id?: string
    ) {}
  
    addMember(userId: string): void {
      if (!this.members.includes(userId)) {
        this.members.push(userId);
      }
    }
  
    removeMember(userId: string): void {
      this.members = this.members.filter(id => id !== userId);
    }
  }
  