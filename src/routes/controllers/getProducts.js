const Product = require('../../db/models/product.js');
const Category = require('../../db/models/category.js');
const { Op, where } = require('sequelize');
const getProducts = async (req, res)=>{
    const { filter_preciomin, filter_precioMax, order } = req.query;
    try {
        //Estructura de objeto de respuesta
        let respons = {
            price:{ 
                price_min: 0, // Precio mínimo entre todos los productos que cumplen con los filtros (excepto el de precios).
                price_max: 0  // Precio máximo entre todos los productos que cumplen con los filtros (excepto el de precios).
            },
            products: {}, // Productos 
            pages: 0, // Cantidad de páginas mostrando 10 productos en cada página.
        }
        // En caso de que se soliciten filtros, se aplican.
        if(filter_preciomin && filter_precioMax){
            respons.products = await Product.findAll({
                where: {
                    price: filter_precioMax == 0 ? { 
                            [Op.gte] : filter_preciomin 
                        } : 
                        { 
                            [Op.gte] : filter_preciomin,
                            [Op.lte] : filter_precioMax
                        }
                },
                includes: Category
            });
            respons.price = {
                price_min: await Product.min('price'),
                price_max: await Product.max('price'),
            }
            respons.pages = Math.ceil(respons.products.length/10);
        }
        // En caso de no haber filtros
        else{
            respons.products = await Product.findAll({
                includes: Category
            });
            respons.price = {
                price_min : await Product.min('price'),
                price_max : await Product.max('price')
            };
            respons.pages = Math.ceil(respons.products.length/10)

        }
        res.send( respons );
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
}

module.exports = getProducts;