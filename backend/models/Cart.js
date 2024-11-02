module.exports = (sequelize, DataTypes) => {
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
  };