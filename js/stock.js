const urlInsumos = 'http://localhost:7296/api/Insumos';

document.querySelector('#btn_insumos').addEventListener('click', getInsumos);

const modal2 = document.getElementById('stockModal');
const buttonStock = document.getElementById('agregar');

// Función para obtener insumos
function getInsumos() {
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlInsumos, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#res');
            res.innerHTML = '';

            for (let item of datos) {
                res.innerHTML += `              
                <tr class="large">
                    <th class="text-center">${item.insumosId}</th>                    
                    <th class="text-center">${item.nombre}</th>
                    <th class="text-center">${item.especialidad}</th>
                    <th class="text-center">${item.stock}</th>
                </tr>
                `;
            }
        }
    };
}
getInsumos();

// Función para agregar un nuevo insumo
buttonStock.addEventListener('click', async () => {
    let insumo = document.getElementById("insumo").value.trim();
    let especialidad = document.getElementById("especialidad").value.trim();
    let stock = document.getElementById("stock").value.trim();

    // Validar campos vacíos
    if (!insumo || !especialidad || !stock) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos.',
            confirmButtonText: 'Entendido',
        });
        return;
    }

    const newInsumo = {
        insumosId: 0,
        nombre: insumo,
        especialidad: especialidad,
        stock: stock,
    };

    try {
        const response = await fetch('http://localhost:7296/api/Insumos', {
            method: 'POST',
            body: JSON.stringify(newInsumo),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Insumo agregado',
                text: 'El insumo se ha agregado correctamente.',
                confirmButtonText: 'Entendido',
            }).then(() => {
                $('#stockModal').modal('hide'); // Cerrar el modal usando Bootstrap 4
                getInsumos(); // Refrescar la lista de insumos
            });
        } else {
            const errorData = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar el insumo',
                text: errorData.message || 'Ocurrió un error en el servidor.',
                confirmButtonText: 'Entendido',
            });
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error del servidor',
            text: 'No se pudo conectar con el servidor. Por favor, intenta más tarde.',
            confirmButtonText: 'Entendido',
        });
    }
});
