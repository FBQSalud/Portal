const urlCantidadEmpleados = "http://localhost:5192/api/empleados";

function getCantidadEmpleados(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlCantidadEmpleados, true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#empl');
            res.innerHTML = [].concat.apply([], datos).length;                                             
        }
    }
}
getCantidadEmpleados();