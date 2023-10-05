const Product = require('../../db/models/product.js');
const Category = require('../../db/models/category.js');

const postProduct = async (req, res)=>{
    try {
        const data = req.body;
        const newProject = await Product.create(data);
        //Verifico si existe la categoría, si no la creo.
        const category = await Category.findOne({where:{ name: data.category}}) 
        if(category){
            await newProject.addCategory(data.category);
        }else{
            await Category.create({name: data.category});
            await newProject.addCategory(data.category);
        }
        res.send("Producto agregado con éxito");
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
}

module.exports = postProduct;