'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.STRING, // Recomenda-se o uso de hashes aqui ao invés de senhas em texto puro.
    token: DataTypes.STRING
  }, {});

  return User;
};
