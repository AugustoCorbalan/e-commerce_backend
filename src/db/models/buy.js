const sequelize = require("../db.js");
const { DataTypes } = require('sequelize');
const User = require('./user.js');
const Product = require('./product.js');
const { v4: uuidv4 } = require('uuid');

const Buy = sequelize.define('buy', {
    id:{
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

//Relaciones Buy - User
Buy.hasOne(User, {
    throw: "buy_user"
});
User.hasMany(Buy, {
    throw: "buy_user"
});

//Relaciones Buy - Product
Buy.belongsToMany( Product, {
    throw: "buy_product"
});
Product.belongsToMany( Buy, {
    throw: "buy_product"
});


module.exports = Buy;