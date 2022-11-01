import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';
import token from './tokenModel.js';
import contract from './contractModel.js';
import completedWorkAct from './completedWorkActModel.js';

const user = sequelize.define('User', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2],
        msg: 'Too short',
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

user.hasOne(token, { onDelete: 'cascade' });
user.hasMany(contract, { onDelete: 'cascade' });
user.hasMany(completedWorkAct, { onDelete: 'cascade' });

export default user;
