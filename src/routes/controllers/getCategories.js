const Category = require('../../db/models/category.js')
const getCategories = async (req, res)=>{
    try {
        const categories = await Category.findAll();
        res.send( categories );
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
}

module.exports = getCategories;