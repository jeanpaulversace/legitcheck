import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLEnumType as EnumType,
} from 'graphql';

import UserType from './UserType';

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

const CheckType = new ObjectType({
  name: 'Check',
  description: 'A Check on a Post',
  fields: {
    id: { type: new NonNull(ID) },
    vote: { type: new NonNull(CheckVoteType) },
    user: { type: new NonNull(UserType) },
  },
});

export default CheckType;
