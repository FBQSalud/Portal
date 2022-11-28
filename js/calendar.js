const urlTurnos = 'https://localhost:7299/api/turnos';

const buttonCrear = document.getElementById('agregar');

const modal = document.getElementById('turnoModal');

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
                    <th class="text-center">${item.fechaTurno}</th>
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
    let medico=document.getElementById("medicoId").value
    let paciente=document.getElementById("pacienteId").value
    let fecha=document.getElementById("fechaTurno").value
    let observacion=document.getElementById("observacion").value

    const newTurno = {
        medicoId: medico,
        pacienteId: paciente,
        fechaTurno: fecha,
        observacion: observacion,
        estadoTurno: true

}

    fetch('https://localhost:7298/api/turnos', {
        method: 'POST',
        body: JSON.stringify(newTurno),
        headers: {
            "content-type": "application/json",
            'Accept': 'application/json',
        }
    }).then(res => res.json(newTurno))
      .then(datos => close())    
      $(modal).modal('hide')
      location.reload()
      
})



  



