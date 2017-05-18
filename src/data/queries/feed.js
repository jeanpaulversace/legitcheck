import {
  GraphQLList as ListType,
} from 'graphql';

import PostType from '../types/output/PostType';
import PostModel from '../models/Post';
import UserModel from '../models/User';
import UserProfile from '../models/UserProfile';

const feed = {
  type: new ListType(PostType),
  resolve(root, args) {
    return PostModel.findAll({
      where: args,
      include: [{
        model: UserModel,
        include: [{
          model: UserProfile,
          as: 'profile',
        }],
      }],
      order: [['createdAt', 'DESC']],
    });
  },
};

export default feed;
