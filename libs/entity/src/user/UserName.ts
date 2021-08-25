import { Expose } from 'class-transformer';

export class UserName {
  firstName: string;
  lastName: string;

  // @Expose()
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
