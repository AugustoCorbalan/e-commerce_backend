const User = require('../../../db/models/user.js');

const getUser = async (req, res)=>{
    try {
        const {data} = await User.findOne({
            where:{
                id: id
            }
        })
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}

module.exports = getUser;