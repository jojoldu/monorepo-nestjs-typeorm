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
