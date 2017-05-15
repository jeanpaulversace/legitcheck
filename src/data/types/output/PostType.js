import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as ListType,
} from 'graphql';

import UserType from './UserType';
import CommentType from './CommentType';
import CheckType from './CheckType';
import TagType from './TagType';

const PostType = new ObjectType({
  name: 'PostType',
  description: 'A post on the user\'s feed.',
  fields: {
    id: { type: new NonNull(ID) },
    imageURLs: { type: new NonNull(new ListType(StringType)) },
    link: { type: StringType },
    user: {
      type: new NonNull(UserType),
      resolve(post) {
        return post.getUser();
      },
    },
    comments: {
      type: new ListType(CommentType),
      resolve(post) {
        return post.getComments();
      },
    },
    checks: {
      type: new ListType(CheckType),
      resolve(post) {
        return post.getChecks();
      },
    },
    tags: {
      type: new ListType(TagType),
      resolve(post) {
        return post.getTags();
      },
    },
  },
});

export default PostType;
