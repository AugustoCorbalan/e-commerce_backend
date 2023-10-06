const Product = require('../../db/models/product.js');
const Category = require('../../db/models/category.js');

const postProduct = async (req, res)=>{
    try {
        const data = req.body;
        const newProduct = await Product.create(data);
        //Verifico si existe la categoría, si no la creo.
        const category_exist = await Category.findOne({where:{ name: data.category}}) 
        if(category_exist){
            await newProduct.setCategory(category_exist.id);
        }else{
            const new_category = await Category.create({name: data.category});
            await newProduct.setCategory(new_category.id);
        }
        res.send("Producto agregado con éxito");
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
}

module.exports = postProduct;