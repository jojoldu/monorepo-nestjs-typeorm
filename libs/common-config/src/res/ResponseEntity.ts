import { ApiProperty } from '@nestjs/swagger';
import { ResponseStatus } from '@app/common-config/res/ResponseStatus';

export class ResponseEntity<T> {
  @ApiProperty() readonly statusCode: string;
  @ApiProperty() readonly message: string;
  @ApiProperty() readonly data: T;

  private constructor(status: ResponseStatus, message: string, data: T) {
    this.statusCode = ResponseStatus[status];
    this.message = message;
    this.data = data;
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
}
