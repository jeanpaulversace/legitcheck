import sequelize from '../sequelize';

import CheckUpdateInput from '../types/input/CheckUpdateInput';
import CheckType from '../types/output/CheckType';
import CheckModel from '../models/Check';

const updateCheck = {
  type: CheckType,
  args: {
    check: {
      description: 'Object containing the checkId and vote of the Check to be updated',
      type: CheckUpdateInput,
    },
  },
  resolve(root, args) {
    const { checkId, vote } = args.check;
    return sequelize.transaction((t) => CheckModel.update({ vote }, {
      where: {
        id: checkId,
      },
      transaction: t,
      returning: true,
    })).then((result) => {
      if (result.length === 1) throw new Error('Error occured updating Check: updated Check not returned from update method');
      const updatedValue = result[result.length - 1][0];
      return Promise.resolve(updatedValue);
    }).catch((error) => Promise.reject(error));
  },
};

export default updateCheck;
