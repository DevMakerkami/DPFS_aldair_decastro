/*module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      category: {
        type: DataTypes.ENUM('Cliente', 'Administrador'),
        allowNull: false
      },
      image: {
        type: DataTypes.STRING(255)
      }
    }, {
      tableName: 'users'
    });
  
    User.associate = (models) => {
      User.hasMany(models.Cart, {
        foreignKey: 'user_id'
      });
    };
  
    return User;
  };*/

  // models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('Cliente', 'Administrador'),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User;
