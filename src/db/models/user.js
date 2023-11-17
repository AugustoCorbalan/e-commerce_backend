const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define("user",{
    userId:{
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

module.exports = User;
