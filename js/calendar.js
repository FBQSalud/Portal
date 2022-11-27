const urlTurnos = 'https://localhost:7299/api/turnos';

const buttonCrear = document.getElementById('agregar');

document.querySelector('#btn_turnos').addEventListener('click', getTurnos);

function getTurnos(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlTurnos, true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#res');
            res.innerHTML = '';

            for(let item of datos){
                res.innerHTML += `              
                <tr class="large">
                    <th class="text-center">${new Date(item.fechaTurno).toLocaleString()}</th>
                    <th class="text-center">${item.turnoId}</th>
                    <th class="text-center">${item.medicoId}</th>
                    <th class="text-center">${item.pacienteId}</th>
                    <th class="text-center">${item.observacion}</th>
                    <th class="text-center">${item.estadoTurno}</th>
                </tr>
                `
            }          
        }
    }
}
getTurnos();

buttonCrear.addEventListener('click', ()=> {
    const newTurno = {
        medicoId: 'medicoId',
        pacienteId: 'pacienteId',
        fechaTurno: 'fechaTurno',
        observacion: 'observacion',
        estadoTurno: 'estadoTurno'

    }

    fetch(urlTurnos, {
        method: 'POST',
        body: JSON.stringify(),
        headers: {
            "content-type": "application/json"
        }
    }).then(res => res.json(newTurno))
      .then(data => console.log(data))
})


