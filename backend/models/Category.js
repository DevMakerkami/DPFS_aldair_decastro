/*module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      }
    }, {
      tableName: 'categories'
    });
  
    Category.associate = (models) => {
      Category.hasMany(models.Product, {
        foreignKey: 'category_id'
      });
    };
  
    return Category;
  };*/

  // models/Category.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Category extends Model {}

Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Category'
});

module.exports = Category;
