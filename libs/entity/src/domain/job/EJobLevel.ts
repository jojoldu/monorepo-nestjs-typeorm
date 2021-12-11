/* eslint-disable */
import { Enum, EnumType } from 'ts-jenum';
import { JobLevel } from '@app/entity/domain/job/JobLevel';

/** eslint-disable */
@Enum('code')
export class EJobLevel extends EnumType<EJobLevel>() {
  static readonly IRRELEVANT = new EJobLevel(
    JobLevel.IRRELEVANT,
    '경력무관',
    0,
    99,
  );
  static readonly BEGINNER = new EJobLevel(
    JobLevel.BEGINNER,
    '인턴/신입',
    0,
    0,
  );
  static readonly JUNIOR = new EJobLevel(JobLevel.JUNIOR, '주니어', 1, 3);
  static readonly MIDDLE = new EJobLevel(JobLevel.MIDDLE, '미들', 4, 7);
  static readonly SENIOR = new EJobLevel(JobLevel.SENIOR, '시니어', 8, 20);

  private constructor(
    readonly _code: JobLevel,
    readonly _name: string,
    readonly _startYear,
    readonly _endYear,
  ) {
    super();
  }

  get code(): JobLevel {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  get startYear(): number {
    return this._startYear;
  }

  get endYear(): number {
    return this._endYear;
  }

  static findName(code: JobLevel): string {
    return this.values().find((e) => e.equals(code))?.name;
  }

  static findByYear(year: number): EJobLevel {
    return this.values().find(
      (e) => e.betweenYear(year) && e !== this.IRRELEVANT,
    );
  }

  betweenYear(year: number): boolean {
    return this.startYear <= year && this.endYear >= year;
  }

  getPeriod(): string {
    return `${this.startYear} ~ ${this.endYear}`;
  }

  equals(code: JobLevel): boolean {
    return this.code === code;
  }

  toCodeName() {
    return {
      code: this.code,
      name: this.name,
    };
  }
}
