//importar servidor express
const express = require('express');

//crear una app de express
const app = express();

//ruta para el home
//use() -> middleware de express(funciones que se ejecutan en cola)
app.use('/', (req, res) => {
    res.send("Hola Mundo con ExpressJS");
});

//puerto
app.listen(3000); //listen -> metodo de express