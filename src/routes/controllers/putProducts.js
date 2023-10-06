const Product = require('../../db/models/product.js');

const putProducts = async (req, res)=>{
    try {
        const productName = req.params;
        const data = req.body;
        //Verifico si existe un producto con ese nombre.
        const product_exist = Product.findOne({where:{ name: productName}});
        if (product_exist){
            await Product.update(data, {where:{name: productName}})
            res.send('El producto se modifico con éxito')
        } else{
            res.send('No existe el producto en la base de datos')
        }
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
}

module.exports = putProducts;