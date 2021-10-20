import { ApiProperty } from '@nestjs/swagger';
import { ResponseStatus } from '@app/common-config/res/ResponseStatus';
import { Exclude } from 'class-transformer';

export class ResponseEntity<T> {
  @ApiProperty()
  @Exclude()
  private readonly _statusCode: string;

  @ApiProperty()
  @Exclude()
  private readonly _message: string;

  @ApiProperty()
  @Exclude()
  private readonly _data: T;

  private constructor(status: ResponseStatus, message: string, data: T) {
    this._statusCode = ResponseStatus[status];
    this._message = message;
    this._data = data;
  }

  static OK(): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.OK, '', '');
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.OK, '', data);
  }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      ResponseStatus.SERVER_ERROR,
      '서버에러가 발생했습니다.',
      '',
    );
  }

  static ERROR_WITH(message: string): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.SERVER_ERROR, message, '');
  }

  get statusCode(): string {
    return this._statusCode;
  }

  get message(): string {
    return this._message;
  }

  get data(): T {
    return this._data;
  }
}
