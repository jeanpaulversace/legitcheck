import DataType from 'sequelize';
import Model from '../sequelize';

const Activity = Model.define('Activity', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  action: {
    type: DataType.ENUM('COM', 'CHK'),
  },

});

export default Activity;
