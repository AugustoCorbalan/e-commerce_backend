const express = require('express');
const router = require('./routes/index');
const cors = require('cors');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const multer = require('multer');
const app = express();

const corsOptions={
    origin: 'http://localhost:3000',
    methods: 'GET, PUT, DELETE, POST',
    credentials: true
}
// Configuración multer:
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb)=>{
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase()); //Genero un id aleatorio y lo concateno con la extensión del archivo.
    }
});
const fileFilter = (req, file, cb)=>{
    const filetypes = /jpeg|jpg|png|svg/; //Expresión regular que valida que contenga alguna de estas extensiones.
    const mimetype = filetypes.test(file.mimetype); // Valido que la propiedad mimetype del objeto file (Que es la extension del archivo), sea un tipo de archivo valido.
    const extname = filetypes.test(path.extname(file.originalname)) //Verifico que la extensión del archivo sea un tipo de archivo permitido.
    if(mimetype && extname){
        return cb(null, true) // en el caso que ambas cosas se cumplan, no retorno error (null),y envió "true".
    }
    cb("Error el archivo debe ser en formato (jpeg, jpg, png ó svg"); //En caso que no se cumplan las condiciones, retorno un error.
}
//Middlewares:
app.use(cors(corsOptions));

app.use(multer({
    storage: storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: { fileSize: 5000000},
    fileFilter: fileFilter
}).single('image'));


app.use(express.json());

app.use(router);

module.exports = app;

