const urlInsumos = 'https://localhost:7296/api/Insumos';

document.querySelector('#btn_insumos').addEventListener('click', getInsumos);

function getInsumos(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlInsumos, true);

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
                    <th class="text-center">${item.insumosId}</th>                    
                    <th class="text-center">${item.nombre}</th>
                    <th class="text-center">${item.especialidad}</th>
                    <th class="text-center">${item.stock}</th>
                </tr>
                `
            }          
        }
    }
}
getInsumos();

