const Category = require('../../db/models/category.js')
const getCategories = async (req, res)=>{
    try {
        const response = await Category.findAll({attributes:['name']}); //Traigo todos los nombres de las categorías creadas.
        const categories = [];
        // Extraigo los nombres de las categorías y los guardo en "categories", para devolver un array con únicamente los nombres.
        response.map((el)=>{
            categories.push(el.name) 
        })
        res.send( categories );
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
}

module.exports = getCategories;