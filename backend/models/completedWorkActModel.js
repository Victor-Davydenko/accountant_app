import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';

const completedWorkAct = sequelize.define('CompletedWorkAct', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  partner: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateOfSign: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  completedWorkActAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  currencyOfCompletedWorkAct: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default completedWorkAct;
