const urlCantidadMedicos = "http://localhost:5192/api/medicos";

function getCantidadMedicos(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlCantidadMedicos, true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#med');
            res.innerHTML = [].concat.apply([], datos).length;                                           
        }
    }
}
getCantidadMedicos();