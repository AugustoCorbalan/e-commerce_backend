const {validationQuerysFiltersPrice, validationQueryName,validationQueryPage, validationQueryOrders, querySplit, whereFilters, calcRange} = require('./functions/functionsGetProducts.js');
const Product = require('../../db/models/product.js');
const Category = require('../../db/models/category.js');
const { Op } = require('sequelize');
const getProducts = async (req, res)=>{
    let { filter_preciomin } = req.query;
    let { filter_precioMax } = req.query;
    let { order } = req.query;
    let name = req.query.name? req.query.name : "";
    let page = req.query.page? req.query.page : 1;
    filter_preciomin= parseInt(filter_preciomin, 10);
    filter_precioMax= parseInt(filter_precioMax, 10);
    //Validar querys (Que sea alguno de los parametros esperados, si no retorno un error).
    const validationFiltersPrice = validationQuerysFiltersPrice(filter_preciomin, filter_precioMax);
    const validationOrders = validationQueryOrders(order);
    const validationName = validationQueryName(name);
    const validationPage = validationQueryPage(Number.parseInt(page));
    //Guardo constantes de paginación:
    const numberPage = validationPage? page : 1;
    const sizePage = 9;
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
            price_max: 0,  // Precio máximo entre todos los productos que cumplen con los filtros (excepto el de precios).
            price_med: 0, // Precio medio 
            price_thirds: 0, // Precio que corresponde a 1 tercio del rango
            price_2thirds: 0 // Precio que corresponde a 2 tercios del rango
        },
        cants: {
            total: 0, // Cantidad de productos que coinciden con los parámetros de búsqueda
            medMinor: 0, // Cantidad de productos con precio menor a price_med
            thirdsBetween: 0, // Cantidad de productos con precio menor a price_tercio
            medMajor: 0, // Cantidad de productos con precio menor a price_2tercio
        },
        products: [], //Lista de productos
        pages: 0, // Cantidad de páginas mostrando 10 productos en cada página.
    }
    
    try {
        const products = await Product.findAll({
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
        respons.products = products;
        const price_min = await Product.min('price');
        const price_max = await Product.max('price');
        respons.price = {
            price_min,
            price_max,
            price_med: (price_max - price_min)/2,
            price_thirds: Math.floor(price_min + (price_max - price_min)/3), 
            price_2thirds: Math.floor(price_min + 2*(price_max - price_min)/3)
        }
        const count_total = await Product.count({
            where: [{price: {      
                [Op.gte] : respons.price.price_min,
                [Op.lte] : respons.price.price_max
            }}]});
        const count_medMinor = await Product.count({
            where: [{price: {      
                [Op.gte] : respons.price.price_min,
                [Op.lte] : respons.price.price_med
            }}]});
        const count_thirdsBetween = await Product.count({
            where: [{price: {      
                [Op.gte] : respons.price.price_thirds,
                [Op.lte] : respons.price.price_2thirds
            }}]});
        const count_medMajor = await Product.count({
            where: [{price: {      
                [Op.gte] : respons.price.price_thirds,
                [Op.lte] : respons.price.price_max
            }}]});

        respons.cants= {
            total: count_total,
            medMinor: count_medMinor,
            thirdsBetween: count_thirdsBetween,
            medMajor: count_medMajor,
        }
        respons.pages = Math.ceil(count_total/10);
        res.send( respons );
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
}

module.exports = getProducts;