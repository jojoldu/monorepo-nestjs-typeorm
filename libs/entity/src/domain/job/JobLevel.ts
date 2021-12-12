/* eslint-disable */
import { Enum, EnumType } from 'ts-jenum';

/** eslint-disable */
@Enum('code')
export class JobLevel extends EnumType<JobLevel>() {
  static readonly IRRELEVANT = new JobLevel('IRRELEVANT', '경력무관', 0, 99);
  static readonly BEGINNER = new JobLevel('BEGINNER', '인턴/신입', 0, 0);
  static readonly JUNIOR = new JobLevel('JUNIOR', '주니어', 1, 3);
  static readonly MIDDLE = new JobLevel('MIDDLE', '미들', 4, 7);
  static readonly SENIOR = new JobLevel('SENIOR', '시니어', 8, 20);

  private constructor(
    readonly _code: string,
    readonly _name: string,
    readonly _startYear: number,
    readonly _endYear: number,
  ) {
    super();
  }

  get code(): string {
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

  static findName(code: string): string {
    return this.values().find((e) => e.equalsByCode(code))?.name;
  }

  static findByYear(year: number): JobLevel {
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

  equals(jobLevel: JobLevel): boolean {
    return this === jobLevel;
  }

  equalsByCode(code: string): boolean {
    return this.code === code;
  }

  toCodeName() {
    return {
      code: this.code,
      name: this.name,
    };
  }
}
