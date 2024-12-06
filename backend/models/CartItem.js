/*module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    }, {
      tableName: 'cart_items'
    });
  
    return CartItem;
  };*/

  // models/CartItem.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cart = require('./Cart');
const Product = require('./Product');

class CartItem extends Model {}

CartItem.init({
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  sequelize,
  modelName: 'CartItem'
});

CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
Cart.hasMany(CartItem, { foreignKey: 'cart_id' });

CartItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });

module.exports = CartItem;
