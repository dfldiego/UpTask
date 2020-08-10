//importar servidor express
const express = require('express');

//importamos router de /routes
const routes = require('./routes');

//crear una app de express
const app = express();

//routes
app.use('/', routes());

//puerto
app.listen(3000); //listen -> metodo de express