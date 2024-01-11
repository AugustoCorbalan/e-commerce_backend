const Product = require('../../../db/models/product.js');
const Category = require('../../../db/models/category.js');
const fs = require('fs-extra');
const { uploadImage } = require('../../../utils/cloudinary.js');

const postProduct = async (req, res)=>{
    try {
        const data = JSON.parse(req.body.data);
        const loadImage = async ()=>{
                let cont=0;
                await Promise.all(req.files.map(async (file)=>{
                    const result = await uploadImage(file.path); // Subo la imágen a cloudinary.
                    await fs.unlink(file.path); //Elimino la imágen que guardo multer en "public".
                    data.image ?
                        data.image = {
                            ...data.image,
                            [cont] : {url: result.url, public_id: result.public_id}
                        } :
                        data.image = {
                            0 : {url: result.url, public_id: result.public_id}
                        }
                    cont++
                }));
        }   
        await loadImage();
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
        res.status(400).send(error.message);
    }
}

module.exports = postProduct;