import sequelize from '../sequelize';

import CommentInputType from '../types/input/CommentInputType';

import CommentType from '../types/output/CommentType';
import CommentModel from '../models/Comment';

const addComment = {
  type: CommentType,
  args: {
    comment: {
      description: 'Object containing the userId, postId, and content of the comment to be added',
      type: CommentInputType,
    },
  },
  resolve(root, args) {
    const { userId, postId, content } = args.comment;
    return sequelize.transaction((t) => CommentModel.create({
      UserId: userId,
      PostId: postId,
      content,
    }, { transaction: t })).then((comment) => Promise.resolve(comment)).catch((error) => Promise.reject(error));
  },
};

export default addComment;
