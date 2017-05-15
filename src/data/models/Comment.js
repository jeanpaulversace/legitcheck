import DataType from 'sequelize';
import Model from '../sequelize';

const Comments = Model.define('Comment', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  content: {
    type: DataType.STRING,
  },

});

export default Comments;
