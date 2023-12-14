const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define("user",{
    //Como userId utilizo el id de usuario generado por la cuenta de google del usuario.
    //O en el caso de una cuenta local, utilizo un UUID.
    userId:{
        type: DataTypes.STRING, 
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
    typeUser:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = User;
