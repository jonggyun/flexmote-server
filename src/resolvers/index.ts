import { mergeResolvers } from 'merge-graphql-schemas';

import companyResolver from './company';
import newsResolver from './news';
import companyTagResolver from './companyTag';
import commentResolver from './comment';

export default mergeResolvers([
  companyResolver,
  newsResolver,
  companyTagResolver,
  commentResolver,
]);
