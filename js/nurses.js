const urlEnfermeras = 'http://localhost:5192/api/enfermeras';

document.querySelector('#btn_enfermeras').addEventListener('click', getEnfermeras);

function getEnfermeras(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlEnfermeras, true);

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
                    <th class="text-center">${item.empleado.horario.fecha}</th>                    
                    <th class="text-center">${item.empleado.nombre}</th>
                    <th class="text-center">${item.empleado.apellido}</th>
                    <th class="text-center">${item.empleado.horario.horaInicio}</th>
                    <th class="text-center">${item.empleado.horario.horaFin}</th>
                    <th class="text-center">${item.empleado.horario.diaSemana}</th>
                </tr>
                `
            }          
        }
    }
}
getEnfermeras();

