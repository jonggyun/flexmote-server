import { mergeResolvers } from 'merge-graphql-schemas';

import companyResolver from './company';
import newsResolver from './news';

export default mergeResolvers([companyResolver, newsResolver]);
