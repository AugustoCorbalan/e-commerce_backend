const User = require('../../../../db/models/user.js');

const handleUser = async (data)=>{
    let user = await User.findOne({where:{userId: data.userid}});
    if(user == null){
        //En el caso que la respuesta sea null, quiere decir que no existe un usuario con ese id en la bd.
        //Por lo tanto procedo a crearlo.
        user = await User.create({
            userId: data.userid,
            name: data.payload.given_name,
            lastName: data.payload.family_name,
            email: data.payload.email
        })
    }
    user = user.dataValues;
    return {
        name: user.name,
        lastName: user.lastName,
        email: user.lastName,
        userId: user.userId,
        typeUser: user.typeUser
    };
}

module.exports = handleUser;