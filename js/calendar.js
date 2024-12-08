document.addEventListener("DOMContentLoaded", function() {
    // Ensure the button with ID 'btn_turnos' exists
    const btnTurnos = document.getElementById('btn_turnos');
    const buttonCrear = document.getElementById('agregar'); // Ensure this button exists in your HTML
    const modal = document.getElementById('turnoModal');

    // Add event listener for 'btn_turnos'
    if (btnTurnos) {
        btnTurnos.addEventListener('click', getTurnos);
    }

    // Function to fetch and display turnos
    function getTurnos() {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'http://localhost:7299/api/turnos', true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                let datos = JSON.parse(this.responseText);
                let res = document.querySelector('#res');
                res.innerHTML = ''; // Clear existing results

                // Loop through the data and add to the table
                for (let item of datos) {
                    res.innerHTML += `              
                    <tr class="large">
                         <th class="text-center">${new Date(item.fechaTurno).toLocaleString()}</th>     
                        <th class="text-center">${item.turnoId}</th>
                        <th class="text-center">${item.medicoId}</th>
                        <th class="text-center">${item.pacienteId}</th>
                        <th class="text-center">${item.observacion}</th>
                        <th class="text-center">${item.estadoTurno}</th>
                    </tr>
                    `;
                }          
            }
        };
    }

    if (buttonCrear) {
        buttonCrear.addEventListener('click', () => {
            let medico = document.getElementById("medicoId").value;
            let paciente = document.getElementById("pacienteId").value;
            let fecha = document.getElementById("fechaTurno").value;
            let observacion = document.getElementById("observacion").value;

            const newTurno = {
                medicoId: medico,
                pacienteId: paciente,
                fechaTurno: fecha,
                observacion: observacion,
                estadoTurno: true
            };

            fetch('http://localhost:7299/api/turnos', {
                method: 'POST',
                body: JSON.stringify(newTurno),
                headers: {
                    "content-type": "application/json",
                    'Accept': 'application/json',
                }
            }).then(res => res.json())
              .then(() => $(modal).modal('hide'));
        });
    }

    getTurnos();
});
