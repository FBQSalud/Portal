const urlCantidadEmpleados = "http://localhost:5192/api/empleados";

function getCantidadEmpleados() {
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlCantidadEmpleados, true);

    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#empl');
            res.innerHTML = ''; // Limpia el contenido previo

            // Itera sobre los datos y construye las filas de la lista
            datos.forEach(item => {
                res.innerHTML += `
                    <div class="au-message-item">
                        <div class="au-message__item-inner">
                            <div class="au-message__item-text">
                                <h5 class="name">${item.nombre} ${item.apellido}</h5>
                                <p>DNI: ${item.dni}</p>
                                <p>Estado: ${item.estado ? "Activo" : "Inactivo"}</p>
                                <p>Usuario: ${item.usuario}</p>
                                <p><strong>Horario:</strong></p>
                                <ul>
                                    <li>Día: ${item.horario?.diaSemana || 'N/A'}</li>
                                    <li>Fecha: ${item.horario?.fecha || 'N/A'}</li>
                                    <li>Hora de Inicio: ${item.horario?.horaInicio || 'N/A'}</li>
                                    <li>Hora de Fin: ${item.horario?.horaFin || 'N/A'}</li>
                                    <span>Empleado ID: ${item.empleadoId}</span>
                                </ul>
                            </div>
                            <div class="au-message__item-avatar">
                                <!-- Siempre muestra la misma foto -->
                                <img src="images/icon/FBQ.SALUD1.png" alt="${item.nombre}" class="avatar avatar--small">
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    };
}

getCantidadEmpleados();




