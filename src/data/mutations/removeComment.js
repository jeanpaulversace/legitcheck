import sequelize from '../sequelize';

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import CommentModel from '../models/Comment';

import DeletedObjectType from '../types/output/DeletedObjectType';

const removeComment = {
  type: DeletedObjectType,
  args: {
    commentId: {
      description: 'A String equal to the id of the Comment to be deleted',
      type: new NonNull(StringType),
    },
  },
  resolve(root, args) {
    return sequelize.transaction((t) => CommentModel.destroy({
      where: {
        id: args.commentId,
      },
    }, { transaction: t })).then((numCommentDeleted) => {
      if (numCommentDeleted !== 1) throw new Error('Error occured deleting Comment: Number of Comments deleted not equal to one');
      return Promise.resolve({ success: true });
    }).catch((error) => Promise.reject(error));
  },
};

export default removeComment;
