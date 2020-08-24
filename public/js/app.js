import proyectos from './modulos/proyectos';
import tareas from './modulos/tareas';
import { actualizarAvance } from './funciones/avance';
/*
aqui podemos ir agregando mas archivos debido a que es el entry
point del webpack config
*/

document.addEventListener('DOMContentLoaded', () => {
    actualizarAvance();
})