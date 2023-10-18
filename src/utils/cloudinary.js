const { v2: cloudinary } = require('cloudinary');

require('dotenv').config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

//Configuracion de cloudinary:          
cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET
  });

//Función para la carga de imágenes:

const uploadImage = async (filepath) => {
return await cloudinary.uploader.upload(
        filepath,
        { folder: "e-commerce"}, //Esto le indica a cloudinary que guarde las imagenes dentro de una carpeta llamada "e-commerce"
        function(error, result){ console.log(result) }
    );

}

//Función para eliminar imágenes en la nube:

const deleteImage = async (public_id) => {
    return await cloudinary.uploader.destroy(public_id);
}

module.exports = {
    uploadImage,
    deleteImage
}
