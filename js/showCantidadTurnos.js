const urlCantidadTurnos = "http://localhost:7299/api/turnos";

function getCantidadTurnos(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlCantidadTurnos, true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#tur');
            res.innerHTML = [].concat.apply([], datos).length;                                 
        }
    }
}
getCantidadTurnos();