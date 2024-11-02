module.exports = (sequelize, DataTypes) => {
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
  };