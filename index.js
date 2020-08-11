//importar servidor express
const express = require('express');

//importamos router de /routes
const routes = require('./routes');

//importamos path -> libreria que lee el file system
const path = require('path');

//crear una app de express
const app = express();

//Archivos estaticos
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine', 'pug'); //set() -> agregar un valor.

//Añadir carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//routes
app.use('/', routes());

//puerto
app.listen(3000); //listen -> metodo de express