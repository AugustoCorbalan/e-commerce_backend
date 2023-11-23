const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const Category = require('./category.js');

const Product = sequelize.define("product",{
    productId:{
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.JSON
    },
    price:{
        type: DataTypes.DECIMAL(10, 2) // Establece un total de 10 digitos, con 2 digitos despues de la coma
    },
    description:{
        type: DataTypes.STRING(1500)
    },
    quantity: {
        type: DataTypes.INTEGER
    }
});

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product);

module.exports = Product;