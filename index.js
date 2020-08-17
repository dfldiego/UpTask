//importar servidor express
const express = require('express');
//importamos router de /routes
const routes = require('./routes');
//importamos path -> libreria que lee el file system
const path = require('path');
//importamos bodyParser
const bodyParser = require('body-parser');

//Helpers con algunas funciones
const helpers = require('./helpers');

//Conexion a BBDD
const db = require('./config/db');

//Importar el modelo
require('./models/Proyectos');
db.sync()
    .then(() => console.log('Conectado a Sequelize'))
    .catch(err => console.log('No se conecto a Sequelize'));

//crear una app de express
const app = express();

//Archivos estaticos
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine', 'pug'); //set() -> agregar un valor.

//Añadir carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//Pasar vardump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;   //res.locals -> es una forma de crear variables y consumirlo en otro archivo del proyecto.
    next();     //se refiere al siguiente middleware. se va al siguiente.
});

//Habilitar BodyParser -> para leer datos del formulario.
app.use(bodyParser.urlencoded({
    extended: true
}));

//routes
app.use('/', routes());

//puerto
app.listen(3000); //listen -> metodo de express