const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const Folder = require('./folder');

const File = sequelize.define('file', {
  fileId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  folderId: {
    type: DataTypes.UUID,
    references: {
      model: Folder,
      key: 'folderId'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
  },
  uploadedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  tableName: 'files',
  timestamps: false
});

Folder.hasMany(File, {foreignKey: 'folderId'});
File.belongsTo(Folder, {foreignKey: 'folderId'});

module.exports = File;