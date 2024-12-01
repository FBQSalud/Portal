const urlPacientes = 'http://localhost:7299/api/pacientes';
const urlHistoriaClinica = 'http://localhost:7299/api/historiaClinica';

const buttonCrear = document.getElementById('atender');

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

            let status = ""

            for(let item of datos){
                if(item.estado === true){
                    status = "En espera"
                }if(item.estado === false){
                    status = "Atendido"
                }
                res.innerHTML += `              
                <tr class="large">
                    <th class="text-center">${item.pacienteId}</th>
                    <th class="text-center">${item.nombre}</th>
                    <th class="text-center">${item.apellido}</th>
                    <th class="text-center">${item.edad}</th>
                    <th class="text-center">${item.dni}</th>
                    <th class="text-center">${status}</span></th>
                    <th>
                         <div class="table-data-feature">
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
    let fechaApertura=document.getElementById("fechaApertura").value

    const newTratamiento = {
        pacienteid: pacienteid,
        diagnostico: diagnostico,
        fechaApertura: fechaApertura,

}

    fetch(urlHistoriaClinica, {
        method: 'POST',
        body: JSON.stringify(newTratamiento),
        headers: {
            "content-type": "application/json",
            'Accept': 'application/json',
        }
    }).then(res => res.json(newTratamiento))
      .then(datos => close())    
      $(modal).modal('hide')
      alert('Paciente atendido con exito')
      location.reload()
      
})

function Atendido(){
    console.log('hola desde Atendido')
                
    const newEstado = {
        estado: false,
    }
    
    fetch(urlPacientes, {
        method: 'POST',
        body: JSON.stringify(newEstado),
        headers: {
            "content-type": "application/json",
            'Accept': 'application/json',
        }
    }).then(res => res.json(newEstado))
      .then(datos => close())    
      location.reload()
    
}

