const sequelize = require("../db.js");
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Category = sequelize.define('category', {
    id:{
        type: DataTypes.UUID,
        defaultValue: ()=>uuidv4(),
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Category;