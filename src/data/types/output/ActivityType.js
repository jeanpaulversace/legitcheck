import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLEnumType as EnumType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import UserType from './UserType';
import PostType from './PostType';

const ActivityActionType = new EnumType({
  name: 'ActivityAction',
  description: 'A custom GraphQLEnumType for Actions on a Activity',
  values: {'COMMENT','CHECK'},
});

const ActivityType = new ObjectType({
  name: 'Activity',
  description: 'Interaction between two users',
  fields: {
    id: { type: new NonNull(ID) },
    action: { type: new NonNull(ActivityActionType) },
    toUser: { type: new NonNull(UserType) },
    fromUser: {type: new NonNull(UserType) },
    post: { type: new NonNull(PostType) },
  },
});

export default ActivityType;
