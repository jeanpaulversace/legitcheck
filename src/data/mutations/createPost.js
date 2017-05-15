import sequelize from '../sequelize';

import PostInputType from '../types/input/PostInputType';

import PostType from '../types/output/PostType';
import PostModel from '../models/Post';
import TagModel from '../models/Tag';
import UserModel from '../models/User';

const createPost = {
  type: PostType,
  args: {
    post: {
      description: 'Object containing the userId, imageURLs, tags, and link(?)',
      type: PostInputType,
    },
  },
  resolve(root, args) {
    let retrievedUser = null;
    let createdTags = null;
    let createdPost = null;
    const postParams = args.post;

    return sequelize.transaction((t) => UserModel.findById(postParams.userId, { transaction: t })
      .then((user) => {
        // find user that is posting
        retrievedUser = user;
        // find or create tag(s)
        return Promise.all(postParams.tags.map((tag) => TagModel.findOrCreate({ where: { name: tag }, defaults: { name: tag }, transaction: t })));
      })
      .then((tags) => {
        createdTags = tags.map((tag) => tag[0]);
        // create post
        return PostModel.create({
          imageURLs: postParams.imageURLs,
          link: postParams.link || '',
          UserId: retrievedUser.get('id'), // might be 'user'
        }, { transaction: t });
      })
      .then((post) => {
        createdPost = post;
        // add tags to post
        return post.addTags(createdTags, { transaction: t });
      })).then(() => Promise.resolve(createdPost)).catch((error) => Promise.reject(error));
  },
};

export default createPost;
