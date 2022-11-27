const urlLogin = 'https://localhost:7297/api/admin/login';
const buttonLogin = document.getElementById('login');

buttonLogin.addEventListener('click', ()=> {
    let jsonBody = {
        email : document.getElementById("email").value,
        password : document.getElementById("password").value,
    };
    (async () => {
        const rawResponse = await fetch(urlLogin, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonBody)
        });
        const content = await rawResponse.json();
        console.log(content.status)
        if(content.status === "exito"){
            LoginHandler(content,callback)
            window.location.href="index.html"
        }else{
            window.location.href="register.html"
        }
      })();
})

