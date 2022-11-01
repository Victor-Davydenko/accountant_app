import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';
import completedWorkAct from './completedWorkActModel.js';

const contract = sequelize.define('Contract', {
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
  dateOfEnd: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  contractAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  currencyOfContract: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

contract.hasMany(completedWorkAct, { onDelete: 'cascade' });

export default contract;
