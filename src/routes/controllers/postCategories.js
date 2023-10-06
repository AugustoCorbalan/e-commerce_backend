const Category = require('../../db/models/category.js');

const postCategories = async (req, res)=>{
    try {
        await Category.create(req.body);
        res.send('Se creó la categoría con éxito');
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
}

module.exports = postCategories;