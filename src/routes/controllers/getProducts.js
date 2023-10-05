const Product = require('../../db/models/product.js');
const Category = require('../../db/models/category.js')
const getProducts = async (req, res)=>{
    try {
        const products = await Product.findAll({
            includes: Category
        })
        res.send( products );
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
}

module.exports = getProducts;