import DataType from 'sequelize';
import Model from '../sequelize';

const Tag = Model.define('Tag', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  name: {
    type: DataType.STRING,
  },

});

export default Tag;
