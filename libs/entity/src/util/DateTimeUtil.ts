import { convert, LocalDate, LocalDateTime, nativeJs } from 'js-joda';

export class DateTimeUtil {
  static toDate(localDate: LocalDate | LocalDateTime): Date {
    if (!localDate) {
      return null;
    }

    return convert(localDate).toDate();
  }

  static toLocalDate(date: Date): LocalDate {
    if (!date) {
      return null;
    }
    return LocalDate.from(nativeJs(date));
  }

  static toLocalDateTime(date: Date): LocalDateTime {
    if (!date) {
      return null;
    }
    return LocalDateTime.from(nativeJs(date));
  }
}
