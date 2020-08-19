import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector("#eliminar-proyecto");
if (btnEliminar) {
    btnEliminar.addEventListener('click', (e) => {
        const urlProyecto = e.target.dataset.proyectoUrl;
        //console.log(urlProyecto);

        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.value) {
                //enviar peticion a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                //console.log(url);
                axios.delete(url, { params: urlProyecto })
                    .then(respuesta => console.log(respuesta))
                return;
                Swal.fire(
                    'Proyecto Eliminado!',
                    'El proyecto ha sido eliminado.',
                    'success'
                );

                //redireccionar al inicio
                setTimeout(() => {
                    window.location.href = '/'
                }, 3000)
            }
        })
    })
}
export default btnEliminar;