import { Enum, EnumType } from 'ts-jenum';
import { JobLevel } from '@app/entity/domain/job/JobLevel';

@Enum('code')
export class JobLevelGroup extends EnumType<JobLevelGroup>() {
  static readonly NEWCOMER = new JobLevelGroup('NEWCOMER', '신입', [
    JobLevel.BEGINNER,
    JobLevel.JUNIOR,
    JobLevel.IRRELEVANT,
  ]);

  static readonly EXPERIENCED = new JobLevelGroup('EXPERIENCED', '경력직', [
    JobLevel.MIDDLE,
    JobLevel.SENIOR,
    JobLevel.IRRELEVANT,
  ]);

  private constructor(
    readonly _code: string,
    readonly _name: string,
    readonly _jobLevels: JobLevel[],
  ) {
    super();
  }

  static findByJobLevel(jobLevel: JobLevel): JobLevelGroup {
    return this.values().find((group) =>
      group._jobLevels.some((level) => level.equals(jobLevel)),
    );
  }

  get code(): string {
    return this._code;
  }
}
