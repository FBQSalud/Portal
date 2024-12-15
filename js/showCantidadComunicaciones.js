document.addEventListener("DOMContentLoaded", function () {
    const urlComunicaciones = "http://localhost:7296/api/Comunicaciones";
    const comunicacionesList = document.querySelector(".au-task-list");
    let isEditing = false; // Modo edición
    let currentId = null;  // ID actual en modo edición

    // Obtener y mostrar comunicaciones
    function getComunicaciones() {
        fetch(urlComunicaciones)
            .then((response) => {
                if (!response.ok) throw new Error("Error al obtener las comunicaciones");
                return response.json();
            })
            .then((data) => {
                comunicacionesList.innerHTML = "";
                data.forEach((comunicacion) => {
                    comunicacionesList.innerHTML += `
                        <div class="au-task__item au-task__item--primary">
                            <div class="au-task__item-inner">
                                <h5 class="task">${comunicacion.comunicacionName}</h5>
                                <span class="time">${new Date(comunicacion.fechaComunicacion).toLocaleDateString()}</span>
                                <div class="actions">
                                    <button class="btn btn-warning btn-sm edit-comunicacion" data-id="${comunicacion.comunicacionesId}">Editar</button>
                                    <button class="btn btn-danger btn-sm delete-comunicacion" data-id="${comunicacion.comunicacionesId}">Borrar</button>
                                </div>
                            </div>
                        </div>`;
                });

                // Asignar eventos a botones
                document.querySelectorAll(".edit-comunicacion").forEach(button => {
                    button.addEventListener("click", handleEditComunicacion);
                });
                document.querySelectorAll(".delete-comunicacion").forEach(button => {
                    button.addEventListener("click", handleDeleteComunicacion);
                });
            })
            .catch((error) => console.error("Error:", error));
    }

    // Abrir modal para editar comunicación
    function handleEditComunicacion(event) {
        const id = event.target.getAttribute("data-id");
        fetch(`${urlComunicaciones}/${id}`)
            .then((response) => {
                if (!response.ok) throw new Error("Error al obtener la comunicación");
                return response.json();
            })
            .then((data) => {
                console.log("Datos obtenidos:", data);
            
                const comunicacionNameField = document.getElementById("comunicacionName");
                const fechaComunicacionField = document.getElementById("fechaComunicacion");
            
                if (comunicacionNameField && fechaComunicacionField) {
                    comunicacionNameField.value = data.comunicacionName;
                    fechaComunicacionField.value = data.fechaComunicacion.split("T")[0];
                } else {
                    console.error("No se encontraron los campos del formulario");
                }
            
                isEditing = true;
                currentId = id;
            
                $('#comunicacionModal').modal('show');
            })
            .catch((error) => console.error("Error al obtener comunicación:", error));            
    }

    // Guardar o actualizar comunicación
    document.getElementById('guardarComunicacion').addEventListener('click', () => {
    const comunicacionName = document.getElementById('comunicacionName').value.trim();
    const fechaComunicacion = document.getElementById('fechaComunicacion').value;

    if (!comunicacionName || !fechaComunicacion) {
        Swal.fire({ icon: 'warning', title: 'Campos incompletos', text: 'Por favor, completa todos los campos.' });
        return;
    }

    const payload = { comunicacionName, fechaComunicacion };
    
    const url = isEditing ? `${urlComunicaciones}/${currentId}` : urlComunicaciones;
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json", "Accept": "application/json" }
    })
        .then((response) => {
            if (!response.ok) {
                return response.text().then(err => { throw new Error(err || "Error al guardar la comunicación"); });
            }
            return response.json();
        })
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: isEditing ? 'Comunicación actualizada' : 'Comunicación creada',
                confirmButtonText: 'Entendido'
            }).then(() => {
                $('#comunicacionModal').modal('hide');
                resetForm();
                getComunicaciones();
            });
        })
        .catch((error) => {
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        });
});
            
    // Eliminar comunicación
    function handleDeleteComunicacion(event) {
        const id = event.target.getAttribute("data-id");
        Swal.fire({
            title: '¿Estás seguro?', text: "Esta acción no se puede deshacer.", icon: 'warning',
            showCancelButton: true, confirmButtonText: 'Sí, borrar', cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${urlComunicaciones}/${id}`, { method: "DELETE" })
                    .then((response) => {
                        if (!response.ok) throw new Error("Error al borrar la comunicación");
                        Swal.fire({ icon: 'success', title: 'Borrado correctamente' });
                        getComunicaciones();
                    });
            }
        });
    }

    // Resetear el formulario
    function resetForm() {
        document.getElementById("comunicacionForm").reset();
        isEditing = false;
        currentId = null;
    }

    getComunicaciones();
});



