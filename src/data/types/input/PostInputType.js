import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as ListType,
} from 'graphql';

const PostInputType = new InputObjectType({
  name: 'PostInput',
  fields: {
    userId: {
      type: new NonNull(StringType),
    },
    imageURLs: {
      type: new NonNull(new ListType(StringType)),
    },
    tags: {
      type: new NonNull(new ListType(StringType)),
    },
    link: {
      type: StringType,
    },
  },
});

export default PostInputType;
