module.exports = (sequelize, DataTypes) => {
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
  };