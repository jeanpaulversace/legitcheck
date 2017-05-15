import sequelize from '../sequelize';

import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import CheckModel from '../models/Check';

import DeletedObjectType from '../types/output/DeletedObjectType';

const removeCheck = {
  type: DeletedObjectType,
  args: {
    checkId: {
      description: 'A String equal to the id of the Check to be deleted',
      type: new NonNull(StringType),
    },
  },
  resolve(root, args) {
    return sequelize.transaction((t) => CheckModel.destroy({
      where: {
        id: args.checkId,
      },
    }, { transaction: t })).then((numCheckDeleted) => {
      if (numCheckDeleted !== 1) throw new Error('Error occured deleting Check: Number of Checks deleted not equal to one');
      return Promise.resolve({ success: true });
    }).catch((error) => Promise.reject(error));
  },
};

export default removeCheck;
