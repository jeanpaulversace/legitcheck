import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import UserType from './UserType';
// import PostType from './PostType';

const CommentType = new ObjectType({
  name: 'Comment',
  description: 'A Comment on a Post',
  fields: {
    id: { type: new NonNull(ID) },
    content: { type: new NonNull(StringType) },
    user: {
      type: new NonNull(UserType),
      resolve(comment) {
        return comment.getUser();
      },
    },
  },
});

export default CommentType;
