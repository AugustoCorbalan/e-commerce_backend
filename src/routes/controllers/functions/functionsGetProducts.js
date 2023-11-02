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

module.exports = {
    validationQuerysFiltersPrice,
    validationQueryOrders,
    querySplit
}