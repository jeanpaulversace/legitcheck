import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const CheckInputType = new InputObjectType({
  name: 'CheckInput',
  fields: {
    userId: {
      type: new NonNull(StringType),
    },
    postId: {
      type: new NonNull(StringType),
    },
    vote: {
      type: new NonNull(StringType),
    },
  },
});

export default CheckInputType;
