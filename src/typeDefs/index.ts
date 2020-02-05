import { mergeTypes } from 'merge-graphql-schemas';

import companyType from './company';

export default mergeTypes([companyType]);
