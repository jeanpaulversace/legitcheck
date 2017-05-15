import {
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const DeletedObjectType = new ObjectType({
  name: 'DeletedObject',
  description: 'Result after Deleting an Object',
  fields: {
    success: { type: BooleanType },
  },
});

export default DeletedObjectType;
