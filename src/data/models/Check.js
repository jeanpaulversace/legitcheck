import DataType from 'sequelize';
import Model from '../sequelize';

const Check = Model.define('Check', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  vote: {
    type: DataType.ENUM('UP', 'DOWN'),
  },

});

export default Check;
