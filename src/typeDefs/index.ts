import { mergeTypes } from 'merge-graphql-schemas';

import companyType from './company';
import newsType from './news';

export default mergeTypes([companyType, newsType]);
