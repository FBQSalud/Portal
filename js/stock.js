const urlInsumos = 'https://localhost:7296/api/Insumos';

document.querySelector('#btn_insumos').addEventListener('click', getInsumos);

const modal = document.getElementById('stockModal');

const buttonStock = document.getElementById('agregar');

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

buttonStock.addEventListener('click', ()=> {
    let insumo=document.getElementById("insumo").value
    let especialidad=document.getElementById("especialidad").value
    let stock=document.getElementById("stock").value

    const newInsumo = {
        insumosId: 0,
        nombre: insumo,
        especialidad: especialidad,
        stock: stock
}

    fetch('https://localhost:7296/api/Insumos', {
        method: 'POST',
        body: JSON.stringify(newInsumo),
        headers: {
            "content-type": "application/json",
            'Accept': 'application/json',
        }
    }).then(res => res.json(newInsumo))
      .then(datos => close())    
      $(modal).modal('hide')
      location.reload()
      
})

