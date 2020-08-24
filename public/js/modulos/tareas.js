import axios from 'axios';
import Swal from 'sweetalert2';
import { actualizarAvance } from '../funciones/avance';
const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            // request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`
            axios.patch(url, { idTarea })
                .then(function (respuesta) {
                    if (respuesta.status === 200) {
                        icono.classList.toggle('completo'); //evita tener que recargar para actualizar el ESTADO
                        actualizarAvance();
                    }
                })

        }
        if (e.target.classList.contains('fa-trash')) {
            //console.log('Eliminando');
            //console.log(e.target);
            const tareaHTML = e.target.parentElement.parentElement;
            const idTarea = tareaHTML.dataset.tarea;
            /* console.log(tareaHTML);
            console.log(idTarea); */
            Swal.fire({
                title: 'Deseas borrar esta Tarea?',
                text: "Una tarea eliminada no se puede recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrar!',
                cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.value) {
                    /* console.log("Eliminando..."); */
                    const url = `${location.origin}/tareas/${idTarea}`;
                    //Enviar el Delete por medio de AXIOS
                    axios.delete(url, { params: { idTarea } })
                        .then(function (respuesta) {
                            //console.log(respuesta);
                            if (respuesta.status === 200) {
                                //Eliminar el nodo. Vamos al nodo padre. CODIGO DE DOM
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                //Opcional una Alerta
                                Swal.fire(
                                    'Tarea Eliminada Correctamente',
                                    respuesta.data,
                                    'success'
                                )
                                actualizarAvance();
                            }
                        })

                }
            })
        }
    });
}

export default tareas;