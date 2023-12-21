const {validationQuerysFiltersPrice, validationQueryName,validationQueryPage, validationQueryOrders, querySplit, whereFilters, calcRange} = require('./functions/functionsGetProducts.js');
const Product = require('../../db/models/product.js');
const Category = require('../../db/models/category.js');
const { Op } = require('sequelize');
const getProducts = async (req, res)=>{
    let { filter_preciomin, filter_precioMax, order, name, page } = req.query;
    filter_preciomin= parseInt(filter_preciomin, 10);
    filter_precioMax= parseInt(filter_precioMax, 10);
    //Validar querys (Que sea alguno de los parametros esperados, si no retorno un error).
    const validationFiltersPrice = validationQuerysFiltersPrice(filter_preciomin, filter_precioMax);
    const validationOrders = validationQueryOrders(order);
    const validationName = validationQueryName(name);
    const validationPage = validationQueryPage(Number.parseInt(page));
    //Guardo constantes de paginación:
    const numberPage = validationPage? page : 1;
    const sizePage = 10;
    const offset = (numberPage-1)*sizePage;
    //En el caso de existir y ser correcto la query de "order", entonces desestructuro la query.
    if(validationOrders){
        const querySplits = querySplit(order);
        var orderName = querySplits.name;
        var orderDirect = querySplits.direction;
    }
    //Estructura del objeto de la respuesta.
    let respons = {
        price:{ 
            price_min: 0, // Precio mínimo entre todos los productos que cumplen con los filtros (excepto el de precios).
            price_max: 0  // Precio máximo entre todos los productos que cumplen con los filtros (excepto el de precios).
        },
        products: {}, // Productos 
        pages: 0, // Cantidad de páginas mostrando 10 productos en cada página.
    }
    
    try {
        respons.products = await Product.findAll({
            where: whereFilters(
                Op,
                validationFiltersPrice,
                validationName,
                filter_preciomin,
                filter_precioMax,
                name
            ),
            order: validationOrders ? [
                [orderName, orderDirect]
            ] : [['productId', 'ASC']],
            limit: sizePage,
            offset: offset,
            include: Category
        });
        respons.price = {
            price_min: await Product.min('price'),
            price_max: await Product.max('price'),
        }
        const count = await Product.count({
            where: whereFilters(
                Op,
                validationFiltersPrice,
                validationName,
                filter_preciomin,
                filter_precioMax,
                name
        )});
        respons.pages = Math.ceil(count/10);
        res.send( respons );
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
}

module.exports = getProducts;