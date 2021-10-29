import got from 'got';

export class HackerNewsService {
  async getHackerNews() {
    const url = 'https://hacker-news.firebaseio.com/v0/item/2921983.json';
    return got.get(url).json();
  }
}
