const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Cart = sequelize.define( "cart", {
    id:{
        type: DataTypes.UUID,
        defaultValue: ()=> uuidv4(),
        primaryKey: true
    },
    products:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
    },
    products_saved:{    
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
    }
})

module.exports = Cart;