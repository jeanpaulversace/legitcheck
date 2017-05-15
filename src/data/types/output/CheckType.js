import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';

import UserType from './UserType';
// import PostType from './PostType';

import CheckVoteType from '../enum/CheckVoteType';

const CheckType = new ObjectType({
  name: 'Check',
  description: 'A Check on a Post',
  fields: {
    id: { type: new NonNull(ID) },
    vote: { type: new NonNull(CheckVoteType) },
    user: {
      type: new NonNull(UserType),
      resolve(check) {
        return check.getUser();
      },
    },
  },
});

export default CheckType;
