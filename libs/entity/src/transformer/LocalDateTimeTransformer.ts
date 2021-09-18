import { ValueTransformer } from 'typeorm';
import { LocalDateTime } from 'js-joda';
import { DateTimeUtil } from '@app/entity/util/DateTimeUtil';

export class LocalDateTimeTransformer implements ValueTransformer {
  to(entityValue: LocalDateTime): Date {
    return DateTimeUtil.toDate(entityValue);
  }

  from(databaseValue: Date): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(databaseValue);
  }
}
