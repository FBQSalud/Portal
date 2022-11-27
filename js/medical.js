const urlPacientes = 'https://localhost:7299/api/pacientes';

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

function Observacion(){
    console.log('hola desde Observacion')
}

function Atendido(){
    console.log('hola desde Atendido')
}

