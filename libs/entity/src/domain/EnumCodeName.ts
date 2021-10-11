import { ICodeName } from '@app/entity/domain/ICodeName';
import { Expose } from 'class-transformer';
import { EnumType } from 'ts-jenum';

export class EnumCodeName {
  private readonly _code: string;
  private readonly _name: string;

  constructor<T extends EnumType>(e: T) {
    this._code = e.enumName;
    this._name = e.name;
  }

  static values<T extends ICodeName>(enums: T[]): EnumCodeName[] {
    return enums.map((e) => new EnumCodeName(e));
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
