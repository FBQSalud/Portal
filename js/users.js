const urlUsuarios = 'http://localhost:7298/api/users'

const buttonCrear = document.getElementById('agregar');

const modal = document.getElementById('turnoModal');

document.querySelector('#btn_usuarios').addEventListener('click', getUsuarios);

function getUsuarios(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlUsuarios, true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#res');
            res.innerHTML = '';

            for(let item of datos){
                let rol = "default"
                let status = "inactivo"
                if(item.softDelete === true){
                    status = "inactivo"
                }if(item.softDelete === false){
                    status = "activo"
                }
                if(item.rolId === 1){
                    rol = "Admin"
                }if(item.rolId === 2){
                    rol = "empleado"
                }
                res.innerHTML += `              
                <tr class="large">
                    <th class="text-center">${new Date(item.fechaAlta).toLocaleString()}</th>                    
                    <th class="text-center"><span class="block-email">${item.email}</span></th>
                    <th class="text-center">${item.userName}</th>
                    <th class="text-center">${item.employeeId}</th>
                    <th class="text-center"><span class="status--process">${status}</span></th>
                    <th class="text-center">${rol}</th>
                </tr>
                `
            }          
        }
    }
}
getUsuarios();

buttonCrear.addEventListener('click', async () => {
    // Obtener valores de los inputs
    let userName = document.getElementById("UserName").value.trim();
    let dni = document.getElementById("DNI").value.trim();
    let password = document.getElementById("password").value.trim();
    let email = document.getElementById("email").value.trim();

    // Validar campos vacíos
    if (!userName || !dni || !password || !email) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // Construir objeto del nuevo usuario
    const newUser = {
        userName: userName,
        dni: dni,
        employeeId: 2,
        email: email,
        rolId: 2,
        password: password,
        picture: 'default.jpg',
    };

    console.log(JSON.stringify(newUser)); // Para depuración

    try {
        // Hacer la solicitud POST al servidor
        const response = await fetch(urlUsuarios, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        // Verificar si la respuesta es correcta
        if (response.ok) {
            const result = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Usuario creado',
                text: 'El usuario se ha creado exitosamente.',
                confirmButtonText: 'Entendido'
            }).then(() => {
                // Cerrar el modal y recargar o actualizar la página
                $('#modal').modal('hide');
                location.reload(); // Considera actualizar solo la tabla en lugar de recargar la página completa.
            });
        } else {
            // Manejar errores del servidor
            const errorData = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el usuario',
                text: errorData.message || 'Ocurrió un error en el servidor.',
                confirmButtonText: 'Entendido'
            });
        }
    } catch (error) {
        // Manejar errores de red
        console.error('Error al conectarse con el servidor:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error del servidor',
            text: 'No se pudo conectar con el servidor. Por favor, intenta más tarde.',
            confirmButtonText: 'Entendido'
        });
    }
});
