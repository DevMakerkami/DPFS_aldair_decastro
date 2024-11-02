module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255)
    }
  }, {
    tableName: 'products'
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: 'category_id'
    });
    Product.belongsToMany(models.Cart, {
      through: 'CartItem',
      foreignKey: 'product_id'
    });
  };

  return Product;
};