const Product = require('../../db/models/product.js');

const deleteProducts = async (req, res)=>{
    try {
        const product_name = req.params;
        // Verifico si el producto existe.
        const product_exist = Product.findOne({where:{name: product_name}});
        if(product_exist){
            await Product.destroy({where:{name: product_name}});
            res.send('Producto eliminado');
        }else{
            res.send('No existe el producto que desea eliminar')
        }
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
}

module.exports = deleteProducts;