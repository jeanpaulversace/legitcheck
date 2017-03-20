import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import UserType from './UserType';

const CommentType = new ObjectType({
  name: 'Comment',
  description: 'Comment on a Post',
  fields: {
    id: { type: new NonNull(ID) },
    content: { type: new NonNull(StringType) },
    user: { type: new NonNull(UserType) },
  },
});

export default CommentType;
