const Category = require('../../db/models/category.js');
const Product = require('../../db/models/product.js');
const getProductById = async (req, res)=>{
    try {
        const {productId} = req.params;
        const data = await Product.findByPk(productId, {include: Category});
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}

module.exports = getProductById;
