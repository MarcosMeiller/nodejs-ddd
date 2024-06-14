export class User {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public id?: string
  ) {}
    changeEmail(newEmail: string): void {
      this.email = newEmail;
    }
  
    changePassword(newPassword: string): void {
      this.password = newPassword;
    }
  }
  