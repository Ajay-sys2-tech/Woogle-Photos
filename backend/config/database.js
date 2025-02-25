const Sequelize = require('sequelize');
const config = require("./config").development;

const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate().then(() => {
    console.log('DB Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

//  sequelize.sync({force: true});

module.exports = { sequelize }