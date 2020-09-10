//importar servidor express
const express = require('express');
//importamos router de /routes
const routes = require('./routes');
//importamos path -> libreria que lee el file system
const path = require('path');
//importamos bodyParser
const bodyParser = require('body-parser');
//importamos expressValidator
const expressValidator = require('express-validator');
//importamos connect-flash
const flash = require('connect-flash');
//importamos express-session
const session = require('express-session');
//importamos cookie-parser
const cookieParser = require('cookie-parser');
//importamos passport
const passport = require('./config/passport');

//Helpers con algunas funciones 
const helpers = require('./helpers');

//Conexion a BBDD
const db = require('./config/db');

require('dotenv').config();

//Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');
//sync me genera la tabla automaticamente
db.sync()
    .then(() => console.log('Conectado a Sequelize'))
    .catch(err => console.log('No se conecto a Sequelize'));

//crear una app de express
const app = express();

//puerto
app.set('port', (process.env.PORT || 8080))

//Archivos estaticos
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine', 'pug'); //set() -> agregar un valor.

//Habilitar BodyParser -> para leer datos del formulario.
app.use(bodyParser.urlencoded({ extended: true }));

// Agregamos express validator a toda la aplicacion
/* app.use(expressValidator()); */

//Añadir carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//agregar flash messages.
app.use(flash());

//agregamos cookieParser
app.use(cookieParser());

//agregamos las sesiones. Sessiones nos permiten navegar entre distintas paginas sin volvernos a autenticar.
app.use(session({
    secret: 'supersecreto',
    resave: false,                  //si queremos que alguien se autentique en el sistema, mantenga la sesion viva incluso si no esta haciendo nada.
    saveUninitialized: false         //si queremos que alguien se autentique en el sistema, mantenga la sesion viva incluso si no esta haciendo nada.
}));

// iniciar una instancia de passport
app.use(passport.initialize());
app.use(passport.session());

//Pasar vardump a la aplicacion
app.use((req, res, next) => {
    /* console.log(req.user); */  //aqui esta la info referida al usuario
    res.locals.vardump = helpers.vardump;   //res.locals -> es una forma de crear variables y consumirlo en otro archivo del proyecto.
    res.locals.mensajes = req.flash();
    res.locals.usuario = { ...req.user } || null
    /* console.log(res.locals.usuario); */
    next();     //se refiere al siguiente middleware. se va al siguiente.
});

//routes
app.use('/', routes());

app.listen(app.get('port'));