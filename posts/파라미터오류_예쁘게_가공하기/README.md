# NestJS 파라미터 오류 가공하기

```js
import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { classToPlain } from 'class-transformer';
import { ValidationError } from 'class-validator';

@Catch(BadRequestException)
export class BadParameterFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const responseBody = exception.response;
    const isValidationError = responseBody instanceof ValidationError;

    response
      .status(status)
      .json(
        classToPlain(
          ResponseEntity.ERROR_WITH_DATA<CustomValidationError[]>(
            '요청 값에 문제가 있습니다.',
            ResponseStatus.BAD_PARAMETER,
            isValidationError
              ? [this.toCustomValidationErrorByNest(responseBody)]
              : (responseBody.message as CustomValidationError[]),
          ),
        ),
      );
  }

  toCustomValidationErrorByNest(
    responseBody: ValidationError,
  ): CustomValidationError {
    return new CustomValidationError(responseBody);
  }
}
```

* ResponseEntity는 별도로 만든 응답형 클래스입니다.

```js
export class ResponseEntity<T> {
  @Exclude() private readonly _statusCode: string;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

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
      '서버 에러가 발생했습니다.',
      '',
    );
  }

  static ERROR_WITH(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
  ): ResponseEntity<string> {
    return new ResponseEntity<string>(code, message, '');
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
    data: T,
  ): ResponseEntity<T> {
    return new ResponseEntity<T>(code, message, data);
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
```

```js
import { ValidationError } from '@nestjs/common';

export class CustomValidationError {
  property: string;
  value: any;
  constraints: Constraint[];

  constructor(validationError: ValidationError) {
    this.property = validationError.property;
    this.value = validationError.value;
    if (validationError.constraints) {
      this.constraints = Object.entries(validationError.constraints).map(
        (obj) => new Constraint(obj),
      );
    }
  }
}

class Constraint {
  type: string;
  message: string;

  constructor(constraint: string[]) {
    this.type = constraint[0];
    this.message = constraint[1];
  }
}
```
