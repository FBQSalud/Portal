const urlUsuarios = 'http://localhost:7298/api/users'

const buttonCrear = document.getElementById('agregar');

const modal = document.getElementById('turnoModal');

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
                let rol = "default"
                let status = "inactivo"
                if(item.softDelete === true){
                    status = "inactivo"
                }if(item.softDelete === false){
                    status = "activo"
                }
                if(item.rolId === 1){
                    rol = "Admin"
                }if(item.rolId === 2){
                    rol = "empleado"
                }
                res.innerHTML += `              
                <tr class="large">
                    <th class="text-center">${new Date(item.fechaAlta).toLocaleString()}</th>                    
                    <th class="text-center"><span class="block-email">${item.email}</span></th>
                    <th class="text-center">${item.userName}</th>
                    <th class="text-center">${item.employeeId}</th>
                    <th class="text-center"><span class="status--process">${status}</span></th>
                    <th class="text-center">${rol}</th>
                </tr>
                `
            }          
        }
    }
}
getUsuarios();

buttonCrear.addEventListener('click', ()=> {
    let userName =document.getElementById("UserName").value
    let dni=document.getElementById("DNI").value
    let password=document.getElementById("password").value
    let email=document.getElementById("email").value

    const newUser = {
        userName: userName,
        dni: dni,
        employeeId: 2,
        email: email,
        rolId: 2,
        password: password,
        picture: 'default.jpg',
   

}
console.log(JSON.stringify(newUser))
    fetch(urlUsuarios, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            "content-type": "application/json",
            'Accept': 'application/json',
        }
    }).then(res => res.json(newUser))   
    $(modal).modal('hide')
    location.reload();
})