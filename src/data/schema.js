/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import news from './queries/news';
import feed from './queries/feed';
import search from './queries/search';

import createPost from './mutations/createPost';
import addComment from './mutations/addComment';
import removeComment from './mutations/removeComment';
import addCheck from './mutations/addCheck';
import removeCheck from './mutations/removeCheck';
import updateCheck from './mutations/updateCheck';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      news,
      feed,
      search,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      createPost,
      addComment,
      removeComment,
      addCheck,
      removeCheck,
      updateCheck,
    },
  }),
});

export default schema;
