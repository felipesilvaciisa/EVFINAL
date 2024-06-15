// Lista para almacenar los correos de los usuarios registrados
let usuariosRegistrados = [];

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-registro');
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validación de todos los campos del formulario
        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let fechaNacimiento = new Date(document.getElementById('fecha-nacimiento').value);
        let email = document.getElementById('email').value;
        let cargo = document.getElementById('cargo').value;
        let fechaIngreso = new Date(document.getElementById('fecha-ingreso').value);
        
        // Verificar que todos los campos estén llenos
        if (!nombre || !apellido || !fechaNacimiento || !email || !cargo || !fechaIngreso) {
            alert('Todos los campos son obligatorios.');
            return;
        }
        
        // Validación de correo único
        if (usuariosRegistrados.includes(email)) {
            alert('El correo electrónico ya está registrado.');
            return;
        }
        
        // Validación de la fecha de ingreso no sea menor a la fecha de nacimiento más 18 años
        let edadTrabajador = fechaIngreso.getFullYear() - fechaNacimiento.getFullYear();
        let mes = fechaIngreso.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && fechaIngreso.getDate() < fechaNacimiento.getDate())) {
            edadTrabajador--;
        }
        if (edadTrabajador < 18) {
            alert('El trabajador no puede haber ingresado antes de los 18 años.');
            return;
        }
        
        // Mostrar modal de confirmación
        $('#modal-confirmacion').modal('show');
        
        // Al confirmar en la modal, agregar los datos del usuario a la lista
        document.getElementById('confirmar-agregar').onclick = function() {
            usuariosRegistrados.push(email); // Agregar correo a la lista de registrados
            let listaUsuarios = document.getElementById('lista-usuarios');
            let usuarioHTML = `
                <div class="col-md-3">
                    <p><strong>${nombre} ${apellido}</strong></p>
                    <p>${email}</p>
                    <p>${cargo}</p>
                    <p>${fechaIngreso.toISOString().split('T')[0]}</p>
                    <button onclick="eliminarUsuario('${email}', this)">Eliminar</button>
                </div>
            `;
            listaUsuarios.innerHTML += usuarioHTML;
            $('#modal-confirmacion').modal('hide');
        };
    });
});

// Función para eliminar usuario de la cuadrícula
function eliminarUsuario(email, boton) {
    let indice = usuariosRegistrados.indexOf(email);
    if (indice !== -1) {
        usuariosRegistrados.splice(indice, 1); // Eliminar correo de la lista de registrados
        boton.parentElement.remove(); // Eliminar el elemento de la cuadrícula
    }
}
