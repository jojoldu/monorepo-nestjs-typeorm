export class UserName {
  firstName: string;
  lastName: string;

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
