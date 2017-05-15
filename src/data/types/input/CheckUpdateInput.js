import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const CheckUpdateInput = new InputObjectType({
  name: 'CheckUpdateInput',
  fields: {
    checkId: {
      type: new NonNull(StringType),
    },
    vote: {
      type: new NonNull(StringType),
    },
  },
});

export default CheckUpdateInput;
