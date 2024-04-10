const urlCantidadPacientes = "http://localhost:7299/api/pacientes";

function getCantidadPacientes(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlCantidadPacientes, true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#pac');
            res.innerHTML = [].concat.apply([], datos).length;                                             
        }
    }
}
getCantidadPacientes();