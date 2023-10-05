const app = require('./app.js');
const sequelize = require('./db/db.js');
require('dotenv').config();
const { PORT } = process.env;

async function main (){
    try {
        await sequelize.sync({force: true});
        app.listen(PORT);
        console.log(`Server is listening on PORT: ${PORT}`)
    } catch (error) {
        console.error('Ocurrió un error', error)
    }
}
main();
