const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});


const Subtask = sequelize.define('Subtask', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

Task.hasMany(Subtask, { as: 'subtasks', onDelete: 'CASCADE' });
Subtask.belongsTo(Task);

module.exports = { Task, Subtask };