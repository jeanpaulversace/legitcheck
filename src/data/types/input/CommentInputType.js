import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const CommentInputType = new InputObjectType({
  name: 'CommentInput',
  fields: {
    userId: {
      type: new NonNull(StringType),
    },
    postId: {
      type: new NonNull(StringType),
    },
    content: {
      type: new NonNull(StringType),
    },
  },
});

export default CommentInputType;
