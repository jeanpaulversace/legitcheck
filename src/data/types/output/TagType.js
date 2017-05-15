import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as ListType,
} from 'graphql';

import PostType from './PostType';

const TagType = new ObjectType({
  name: 'Tag',
  description: 'A Tag on a Post',
  fields: () => ({
    id: { type: new NonNull(ID) },
    name: { type: new NonNull(StringType) },
    posts: {
      type: new ListType(PostType),
      resolve(tag) {
        return tag.getPosts();
      },
    },
  }),
});

export default TagType;
