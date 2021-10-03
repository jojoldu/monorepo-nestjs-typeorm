export class UserName {
  firstName: string;
  lastName: string;

  constructor() {}

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
