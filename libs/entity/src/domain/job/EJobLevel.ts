/* eslint-disable */
import { Enum, EnumType } from 'ts-jenum';
import { JobLevel } from '@app/entity/domain/common-type/job/JobLevel';
import { CodeName } from '@app/web-common/type/CodeName';

/** eslint-disable */
@Enum('code')
export class EJobLevel extends EnumType<EJobLevel>() {
  static readonly IRRELEVANT = new EJobLevel(JobLevel.IRRELEVANT, '경력무관');
  static readonly INTERN = new EJobLevel(JobLevel.INTERN, '인턴');
  static readonly BEGINNER = new EJobLevel(JobLevel.BEGINNER, '신입 (1년이하)');
  static readonly JUNIOR = new EJobLevel(JobLevel.JUNIOR, '주니어 (1~3년)');
  static readonly MIDDLE = new EJobLevel(JobLevel.MIDDLE, '미들 (4~8년)');
  static readonly SENIOR = new EJobLevel(JobLevel.SENIOR, '시니어 (9~12년)');
  static readonly TOP = new EJobLevel(JobLevel.TOP, '탑티어');

  private constructor(readonly _code: JobLevel, readonly _name: string) {
    super();
  }

  static toCodeNames(): CodeName[] {
    return EJobLevel.values().map(e => e.toCodeName())
  }

  static findCodeNameOrCreate(jobLevel: JobLevel) {
    return EJobLevel.values().find(v => v.code === jobLevel) || new EJobLevel(jobLevel, jobLevel)
  }

  get code(): JobLevel {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  equals (jobLevel: JobLevel): boolean {
    return this.code === jobLevel;
  }

  toCodeName(): CodeName {
    return new CodeName(this.code, this.name)
  }
}
