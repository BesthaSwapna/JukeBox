const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../config')

const basename = path.basename(__filename);
const models = {};
const modelsPath = `${__dirname}/../models`;

const sequelize = new Sequelize(config.database.dbname, config.database.uname, config.database.pwd, {
  host: config.database.host,
  dialect: config.database.dialect,
  pool: {
    max: 10,
    min: 0,
    idle: 5000,
  },
})

// if (process.env.DB_SYNC === "true") {
sequelize.sync()
// }

fs.readdirSync(modelsPath)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = require(path.join(modelsPath, file))(sequelize, Sequelize)
    models[model.name] = model;
  })


Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
});

//Models/tables
models.musicians = require('../models/musicians')(sequelize, Sequelize);
models.albums = require('../models/album')(sequelize, Sequelize);

// album_musician table
const album_musician = sequelize.define('album_musician', {}, { timestamps: false });

//Relations
models.albums.belongsToMany(models.musicians, { through: album_musician });
models.musicians.belongsToMany(models.albums, { through: album_musician });

module.exports = {
  sequelize,
  models,
};

