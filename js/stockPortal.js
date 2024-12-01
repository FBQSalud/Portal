const urlInsumosPortal = 'http://localhost:7296/api/Insumos';

document.querySelector('#btn_insumos_portal').addEventListener('click', getInsumosPortal);

function getInsumosPortal(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlInsumosPortal, true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#rest');
            res.innerHTML = '';

            for(let item of datos){
                res.innerHTML += `              
                <tr class="large">                   
                    <th class="text-center" style="color: #fff;">${item.nombre}</th>
                    <th class="text-center" style="color: #fff;">${item.stock}</th>
                </tr>
                `
            }          
        }
    }
}
getInsumosPortal();