'use strict'

module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('albums', {
    album_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      required: true
    },
    name: {
      type: DataTypes.STRING,
      required: true
    },
    release_date: {
      type: DataTypes.DATE,
      required: true
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    underscored: true
  });
  return Album;
};
