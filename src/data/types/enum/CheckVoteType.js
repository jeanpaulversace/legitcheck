import {
  GraphQLEnumType as EnumType,
} from 'graphql';

const CheckVoteType = new EnumType({
  name: 'CheckVote',
  description: 'A custom GraphQLEnumType for Votes on the Check type',
  values: {
    UP: {
      value: 'UP',
    },
    DOWN: {
      value: 'DOWN',
    },
  },
});

export default CheckVoteType;
