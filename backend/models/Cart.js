/*module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'carts'
    });
  
    Cart.associate = (models) => {
      Cart.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Cart.belongsToMany(models.Product, {
        through: 'CartItem',
        foreignKey: 'cart_id'
      });
    };
  
    return Cart;
  };*/

  // models/Cart.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

class Cart extends Model {}

Cart.init({
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Cart',
  timestamps: false
});

Cart.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Cart, { foreignKey: 'user_id' });

module.exports = Cart;
