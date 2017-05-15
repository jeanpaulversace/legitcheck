import { GraphQLList as ListType } from 'graphql';

import PostType from '../types/output/PostType';
import Sequelize from '../sequelize';

const search = {
  type: new ListType(PostType),
  resolve(root, args) {
    return Sequelize.models.post.findAll({
      where: {
        tags: {
          $contains: args,
        },
      },
    });
  },
};

export default search;
