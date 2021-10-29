import { Instant, LocalDateTime } from 'js-joda';

export class HackerNewsItem {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;

  constructor() {}

  get createTime(): LocalDateTime {
    const milliTime = this.time * 1000;
    return LocalDateTime.ofInstant(Instant.ofEpochMilli(milliTime));
  }
}
