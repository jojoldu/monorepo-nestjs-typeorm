import { HackerNewsItem } from '../../src/hackernews/HackerNewsItem';
import { request } from '@app/utils/request';
import { LocalDateTime } from 'js-joda';

describe('Request', () => {
  it('HackerNews를 통해서 가져온다', async () => {
    const data: HackerNewsItem = await request<HackerNewsItem>(
      {
        url: 'https://hacker-news.firebaseio.com/v0/item/2921983.json',
        method: 'get',
      },
      HackerNewsItem,
    );

    expect(data.type).toBe('comment');
    expect(data.createTime.toString()).toBe(
      LocalDateTime.of(2011, 8, 25, 3, 38, 47).toString(),
    );
    expect(data.isFirstItem).toBe(false);
  });
});
