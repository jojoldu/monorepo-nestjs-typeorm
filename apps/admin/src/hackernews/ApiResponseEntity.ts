import { Exclude, Type } from 'class-transformer';

export class ApiResponseEntity<T> {
  @Exclude()
  // eslint-disable-next-line @typescript-eslint/ban-types
  private type: Function;

  public statusCode: string;
  public message: string;

  @Type((options) => {
    return (options.newObject as ApiResponseEntity<T>).type;
  })
  public data: T;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(type: Function) {
    this.type = type;
  }
}
