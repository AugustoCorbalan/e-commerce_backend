const validationQuerysFiltersPrice = (filter_preciomin, filter_precioMax)=>{
    let validationFilter = false;
    if((Number.isInteger(filter_preciomin) && Number.isInteger(filter_precioMax))){
        validationFilter = true;
    }
    return validationFilter;
}
const validationQueryOrders = (order)=>{
    let validationOrder = false;
    if( order == "price_ASC" || order == "price_DESC" || order == "name_DESC" || order == "price_ASC"){
        validationOrder = true;
    }
    return validationOrder;
}

const querySplit = (order)=>{
    const orderSplit = order.split("_");
    const orderName = orderSplit[0]
    const orderDirecc = orderSplit[1];
    return {
        name: orderName,
        direction: orderDirecc
    }
}

const validationQueryName = (name)=>{
    let validation = false;
    if(name && name.length < 70){
        validation = true
    }
    return validation;
}

const whereFilters = (Op,validationFiltersPrice, validationName, filter_preciomin, filter_precioMax, name)=>{
    const filters = [];

    if(validationFiltersPrice){
        filters.push({
                price: {      
                    [Op.gte] : filter_preciomin,
                    [Op.lte] : filter_precioMax
                }
            })
    };
    if(validationName){
        filters.push({
            name: {
                [Op.substring] : name
            }
        })
    };
    if(filters.length === 0){ 
        return null;
    }else if(filters.length == 1){
        return filters[0];
    }else if(filters.length == 2){
        return{
            [Op.and]: filters
        }
    }
}
module.exports = {
    validationQuerysFiltersPrice,
    validationQueryOrders,
    querySplit,
    validationQueryName,
    whereFilters
}