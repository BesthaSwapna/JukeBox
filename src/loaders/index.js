const Logger = require('./logger');

const expressLoader = require('./express');
const { sequelize } = require('./sequelize');

const loader = async function ({ expressApp }) {
  await await sequelize.authenticate();
  Logger.log('info', '✌️ DB loaded and connected!');

  await expressLoader.loadModules({ app: expressApp });
  Logger.log('info', '✌️ Express loaded');
};

module.exports = loader;
