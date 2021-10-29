import { HackerNewsItem } from '../../src/hackernews/HackerNewsItem';
import { DateTimeUtil } from '@app/entity/util/DateTimeUtil';
import { LocalDateTime } from 'js-joda';

describe('HackerNewsItem', () => {
  it('Unix Time이 LocalDateTime으로 전환된다', () => {
    const item = new HackerNewsItem();
    const now = LocalDateTime.of(2021, 10, 29, 1, 1, 1);
    item.time = DateTimeUtil.toDate(now).getTime() / 1000;

    const time = item.createTime;

    expect(DateTimeUtil.toString(time)).toBe(DateTimeUtil.toString(now));
  });
});
