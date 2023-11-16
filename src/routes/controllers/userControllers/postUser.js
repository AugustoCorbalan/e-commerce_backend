const User = require('../../../db/models/user.js');

const postUser = async (req, res)=>{
    const data = req.body;
    console.log("data: ", data);
    try {
        const result = await User.create(data);
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}

module.exports = postUser;