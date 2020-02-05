import { mergeResolvers } from 'merge-graphql-schemas';

import companyResolver from './company';

export default mergeResolvers([companyResolver]);
