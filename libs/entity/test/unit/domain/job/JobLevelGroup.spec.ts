import { JobLevel } from '@app/entity/domain/job/JobLevel';
import { JobLevelGroup } from '@app/entity/domain/job/JobLevelGroup';

describe('JobLevelGroup', () => {
  it('JobLevel로 JobLevelGroup를 찾는다', () => {
    const jobLevel = JobLevel.MIDDLE;
    const result = JobLevelGroup.findByJobLevel(jobLevel);

    expect(result).toBe(JobLevelGroup.EXPERIENCED);
  });
});
