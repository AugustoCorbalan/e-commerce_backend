const User = require('../../../db/models/user.js');

const getUsers = async (req, res)=>{
    try {
        const {data} = await User.findAll();
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}

module.exports = getUsers;