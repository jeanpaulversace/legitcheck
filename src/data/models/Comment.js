import DataType from 'sequelize';
import Model from '../sequelize';

const Comment = Model.define('Comment', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  content: {
    type: DataType.STRING,
  },

});

export default Comment;
