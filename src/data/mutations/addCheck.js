import sequelize from '../sequelize';

import CheckInputType from '../types/input/CheckInputType';

import CheckType from '../types/output/CheckType';
import CheckModel from '../models/Check';

const addCheck = {
  type: CheckType,
  args: {
    check: {
      description: 'Object containing the userId, postId, and vote of the Check',
      type: CheckInputType,
    },
  },
  resolve(root, args) {
    const { userId, postId, vote } = args.check;
    return sequelize.transaction((t) => CheckModel.findOne({ where: { UserId: userId, PostId: postId } })
      .then((check) => {
        if (check) {
          check.vote = vote;
          return check.save({ transaction: t, returning: true });
        }
        return CheckModel.create({
          UserId: userId,
          PostId: postId,
          vote,
        }, { transaction: t });
      })).then((check) => Promise.resolve(check)).catch((error) => Promise.reject(error));
  },
};

export default addCheck;
