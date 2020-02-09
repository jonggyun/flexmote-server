import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import 'dotenv/config';

interface NewsProps {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: Date;
}

class NewsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.NAVER_BASE_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('X-Naver-Client-Id', process.env.NAVER_CLIENT_ID || '');
    request.headers.set(
      'X-Naver-Client-Secret',
      process.env.NAVER_CLIENT_SECRET || '',
    );
  }

  async getNews(query: string): Promise<Array<NewsProps>> {
    const { items } = await this.get('/news.json', {
      query,
      display: 5,
      sort: 'date',
    });

    return items;
  }
}

export default NewsAPI;
