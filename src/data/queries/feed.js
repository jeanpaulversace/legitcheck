import {
  GraphQLList as ListType,
} from 'graphql';

import PostType from '../types/output/PostType';
import PostModel from '../models/Post';
import UserModel from '../models/User';

const feed = {
  type: new ListType(PostType),
  resolve(root, args) {
    return PostModel.findAll({ where: args, include: [UserModel] });
  },
};

export default feed;
