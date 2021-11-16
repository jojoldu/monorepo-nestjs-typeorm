import got from 'got';
import { HackerNewsItem } from './HackerNewsItem';
import { restTemplate } from './restTemplate';
import { HttpMethod } from './HttpMethod';

export class HackerNewsService {
  async getHackerNews(itemId: number) {
    const url = `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`;
    return got.get(url).json<HackerNewsItem>();
  }

  async getHackerNewsWithType(itemId: number) {
    const url = `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`;
    return restTemplate(HttpMethod.GET, url, '', HackerNewsItem);
  }

  async getHackerNewsGeneric(itemId: number) {
    const url = `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`;
    return restTemplate(HttpMethod.GET, url, '', HackerNewsItem);
  }
}
