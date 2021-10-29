import { HackerNewsService } from '../../src/hackernews/HackerNewsService';

describe('HackerNewsService', () => {
  let hackerNewsService;

  beforeEach(() => {
    hackerNewsService = new HackerNewsService();
  });

  it('HackerNews Item 하나를 가져온다', async () => {
    const data = await hackerNewsService.getHackerNews();

    expect(data.type).toBe('comment');
  });
});
