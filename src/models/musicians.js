'use strict'

module.exports = (sequelize, DataTypes) => {
  const Musicians = sequelize.define('musicians', {
    musician_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      required: true
    },
    musician_name: {
      type: DataTypes.STRING,
      required: true
    },
    musician_type: {
      type: DataTypes.STRING,
      required: true
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
  return Musicians;
};
