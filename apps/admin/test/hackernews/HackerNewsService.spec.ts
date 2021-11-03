import { HackerNewsService } from '../../src/hackernews/HackerNewsService';
import { HackerNewsItem } from '../../src/hackernews/HackerNewsItem';
import { LocalDateTime } from 'js-joda';

describe('HackerNewsService', () => {
  let hackerNewsService;

  beforeEach(() => {
    hackerNewsService = new HackerNewsService();
  });

  it('HackerNews Item 하나를 가져온다', async () => {
    const data: HackerNewsItem = await hackerNewsService.getHackerNews(2921983);

    expect(data.type).toBe('comment');
  });

  it('Generic Type 변환이 되어 HackerNews Item 하나를 가져온다', async () => {
    const data: HackerNewsItem = await hackerNewsService.getHackerNewsWithType(
      2921983,
    );

    expect(data.type).toBe('comment');
    expect(data.createTime.toString()).toBe(
      LocalDateTime.of(2011, 8, 25, 3, 38, 47).toString(),
    );
    expect(data.isFirstItem).toBe(false);
  });
});
