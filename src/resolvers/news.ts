export default {
  Query: {
    getNews: (_: any, { query }: { query: string }, { dataSources }: any) =>
      dataSources.newsAPI.getNews(query),
  },
};
