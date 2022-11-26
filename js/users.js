const urlUsuarios = 'https://localhost:7297/api/users'

document.querySelector('#btn_usuarios').addEventListener('click', getUsuarios);

function getUsuarios(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlUsuarios, true);

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
                    <th class="text-center">${new Date(item.fechaAlta).toLocaleString()}</th>                    
                    <th class="text-center"><span class="block-email">${item.email}</span></th>
                    <th class="text-center">${item.userName}</th>
                    <th class="text-center">${item.employeeId}</th>
                    <th class="text-center"><span class="status--process">${item.softDelete}</span></th>
                    <th class="text-center">${item.rolId}</th>
                    <th>
                         <div class="table-data-feature">
                         <button class="item" data-toggle="tooltip" data-placement="top" title="Agregar">
                            <i class="zmdi zmdi-plus"></i>
                         </button>
                         <button class="item" data-toggle="tooltip" data-placement="top" title="Editar">
                            <i class="zmdi zmdi-edit"></i>
                         </button>
                         <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar">
                            <i class="zmdi zmdi-delete"></i>
                        </button>                                                      
                         </div>
                    </th>
                </tr>
                `
            }          
        }
    }
}
getUsuarios();