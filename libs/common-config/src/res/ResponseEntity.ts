import { ApiProperty } from '@nestjs/swagger';
import { ResponseStatus } from '@app/common-config/res/ResponseStatus';
import { Exclude, Expose } from 'class-transformer';

export class ResponseEntity<T> {
  @Exclude() private _statusCode: string;
  @Exclude() private _message: string;
  @Exclude() private _data: T;

  constructor() {}

  private static of<T>(
    status: ResponseStatus,
    message: string,
    data: T,
  ): ResponseEntity<T> {
    const res = new ResponseEntity<T>();
    res._statusCode = ResponseStatus[status];
    res._message = message;
    res._data = data;

    return res;
  }

  static OK(): ResponseEntity<string> {
    return ResponseEntity.of<string>(ResponseStatus.OK, '', '');
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return ResponseEntity.of<T>(ResponseStatus.OK, '', data);
  }

  static ERROR(): ResponseEntity<string> {
    return ResponseEntity.of<string>(
      ResponseStatus.SERVER_ERROR,
      '서버에러가 발생했습니다.',
      '',
    );
  }

  static ERROR_WITH(message: string): ResponseEntity<string> {
    return ResponseEntity.of<string>(ResponseStatus.SERVER_ERROR, message, '');
  }

  @ApiProperty()
  @Expose()
  get statusCode(): string {
    return this._statusCode;
  }

  @ApiProperty()
  @Expose()
  get message(): string {
    return this._message;
  }

  @ApiProperty()
  @Expose()
  get data(): T {
    return this._data;
  }
}
