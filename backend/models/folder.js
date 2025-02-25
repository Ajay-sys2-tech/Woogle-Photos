const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
// const {sequelize} = require('./index');
// const File = require("./file");

const Folder = sequelize.define('folder', {
  folderId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: DataTypes.ENUM('csv', 'img', 'pdf', 'ppt', 'jpg', 'jpeg'),
    allowNull: false
  },
  maxFileLimit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'folders',
  timestamps: false
});

// Folder.hasMany(File, {foreignKey: 'folderId'});
// File.belongsTo(Folder, {foreignKey: 'folderId'});

module.exports = Folder;