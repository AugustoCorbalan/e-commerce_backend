const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');
const Product = require('./product.js');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define("user",{
    id:{
        type: DataTypes.UUID,
        defaultValue: () => uuidv4,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cart:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
    }
});

User.belongsToMany(Product, {
    throw: "user_product"
});
Product.belongsToMany(User, {
    throw: "user_product"
});

module.exports = User;