export class UserName {
  firstName: string;
  lastName: string;

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
