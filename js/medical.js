const urlPacientes = 'https://localhost:7298/api/pacientes';

const buttonCrear = document.getElementById('agregar');

const modal = document.getElementById('turnoModal');

document.querySelector('#btn_pacientes').addEventListener('click', getPacientes);

function getPacientes(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlPacientes, true);

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
                    <th class="text-center">${item.pacienteId}</th>
                    <th class="text-center">${item.nombre}</th>
                    <th class="text-center">${item.apellido}</th>
                    <th class="text-center">${item.edad}</th>
                    <th class="text-center">${item.dni}</th>
                    <th>
                         <div class="table-data-feature">
                         <button class="item" data-toggle="tooltip" data-placement="top" onClick="Observacion()" title="Observaciones">
                            <i class="zmdi zmdi-edit"></i>
                         </button>
                         <button class="item" data-toggle="tooltip" data-placement="top" onClick="Atendido()" title="Atendido">
                            <i class="zmdi zmdi-account"></i>
                        </button>                                                      
                         </div>
                    </th>
                </tr>
                `
            }          
        }
    }
}
getPacientes();

buttonCrear.addEventListener('click', ()=> {
    let pacienteid=document.getElementById("pacienteid").value
    let diagnostico=document.getElementById("diagnostico").value
    let medicamento=document.getElementById("medicamento").value

    const newTratamiento = {
        pacienteid: pacienteid,
        diagnostico: diagnostico,
        medicamento: medicamento,

}

    fetch('https://localhost:7298/api/turnos', {
        method: 'POST',
        body: JSON.stringify(newTratamiento),
        headers: {
            "content-type": "application/json",
            'Accept': 'application/json',
        }
    }).then(res => res.json(newTratamiento))
      .then(datos => close())    
      $(modal).modal('hide')
      location.reload()
      
})



function Observacion(){
    console.log('hola desde Observacion')
}

function Atendido(){
    console.log('hola desde Atendido')
}

