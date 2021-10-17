import {
  convert,
  DateTimeFormatter,
  LocalDate,
  LocalDateTime,
  nativeJs,
} from 'js-joda';

export class DateTimeUtil {
  private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
  private static DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern(
    'yyyy-MM-dd HH:mm:ss',
  );

  static toString(localDate: LocalDate | LocalDateTime): string {
    if (!localDate) {
      return '';
    }

    if (localDate instanceof LocalDate) {
      return localDate.format(DateTimeUtil.DATE_FORMATTER);
    }
    return localDate.format(DateTimeUtil.DATE_TIME_FORMATTER);
  }

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

  static toLocalDateBy(strDate: string): LocalDate {
    if (!strDate) {
      return null;
    }

    return LocalDate.parse(strDate, DateTimeUtil.DATE_FORMATTER);
  }

  static toLocalDateTimeBy(strDate: string): LocalDateTime {
    if (!strDate) {
      return null;
    }

    return LocalDateTime.parse(strDate, DateTimeUtil.DATE_TIME_FORMATTER);
  }
}
