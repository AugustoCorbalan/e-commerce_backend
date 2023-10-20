const Product = require('../../db/models/product.js');
const Category = require('../../db/models/category.js');
const fs = require('fs-extra');
const { uploadImage } = require('../../utils/cloudinary.js');

const postProduct = async (req, res)=>{
    try {
        // const data = JSON.parse(req.body.data);
        console.log(req)
        console.log(req.file)
        if(req.file){
            const result = await uploadImage(req.file.path); // Subo la imágen a cloudinary.
            await fs.unlink(req.file.path); //Elimino la imágen que guardo multer en "public".
            data.image = {url: result.url, public_id: result.public_id}; 
        }
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