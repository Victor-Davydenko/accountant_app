import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';

const token = sequelize.define('Token', {
  refreshToken: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default token;
