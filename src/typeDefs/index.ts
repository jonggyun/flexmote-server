import { mergeTypes } from 'merge-graphql-schemas';

import companyType from './company';
import newsType from './news';
import companyTagType from './companyTag';
import commentType from './comment';

export default mergeTypes([companyType, newsType, companyTagType, commentType]);
