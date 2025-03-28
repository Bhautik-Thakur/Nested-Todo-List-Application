const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Subtask extends Model {}

Subtask.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    TaskId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tasks', 
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Subtask',
    timestamps: true,
  }
);

module.exports = Subtask;