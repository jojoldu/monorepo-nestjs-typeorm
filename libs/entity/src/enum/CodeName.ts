import { Expose } from 'class-transformer';

export class CodeName {
  private readonly _code: string;
  private readonly _name: string;

  constructor(code: string, name: string) {
    this._code = code;
    this._name = name;
  }

  @Expose()
  get code(): string {
    return this._code;
  }

  @Expose()
  get name(): string {
    return this._name;
  }
}
