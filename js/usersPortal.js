const urlUsuarios = 'http://localhost:7298/api/users'

document.querySelector('#btn_usuariosPortal').addEventListener('click', getUsuariosPortal);

function getUsuariosPortal(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlUsuarios, true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#usu');
            res.innerHTML = '';

            for(let item of datos){
                let status = "inactivo"
                let rol = "default"
                if(item.softDelete === true){
                    status = "inactivo"
                }if(item.softDelete === false){
                    status = "activo"
                }
                if(item.rolId === 1){
                    rol = "Administrador"
                }
                if(item.rolId === 2){
                    rol = "Medico"
                }
                if(item.rolId === 3){
                    rol = "Recepcionista"
                }

                res.innerHTML += `  
                <div class="au-message__item-unread">
                 <div class="au-message__item-inner">
                    <div class="au-message__item-text">
                        <div class="avatar-wrap">
                            <div class="avatar">
                                <img src=${item.picture}>
                            </div>
                        </div>
                    <div class="text">
                    <h5 class="name">${item.userName}</h5>
                <p>${rol}</p>
                </div>
                </div>
                <div class="au-message__item-time">
                <span>${status}</span>
                </div>
                </div>                        
                `
            }          
        }
    }
}
getUsuariosPortal();