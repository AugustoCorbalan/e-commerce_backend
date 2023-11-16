const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Cart = require("./cart.js");

const User = sequelize.define("user",{
    id:{
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
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
    }
});

//Establezco una relación con Cart de uno a uno.
User.hasOne(Cart);
Cart.belongsTo(User);

module.exports = User;
