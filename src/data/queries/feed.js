import {
  GraphQLList as ListType,
} from 'graphql';

import PostType from '../types/PostType';
import Sequelize from '../sequelize';

const feed = {
  type: new ListType(PostType),
  resolve(root, args) {
    return Sequelize.models.post.findAll({ where: args });
  },
};

export default feed;
