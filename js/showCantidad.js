const urlCantidadEnfermeras = "https://localhost:7298/api/enfermeras";

function getCantidadEnfermeras(){

    const xhttp = new XMLHttpRequest();

    let countEnfermeras = 0;

    xhttp.open('GET', urlCantidadEnfermeras, true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#emp');
            res.innerHTML = '';

            for(let item of datos){
                res.innerHTML += `              
                ${item = countEnfermeras++}                 
                `
            }          
        }
    }
}
getCantidadEnfermeras();