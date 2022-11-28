const urlLogin = 'https://localhost:7298/api/admin/login';
const buttonLogin = document.getElementById('login');

buttonLogin.addEventListener('click', (callback)=> {
    let jsonBody = {
        email : document.getElementById("email").value,
        password : document.getElementById("password").value,
    };
    (async () => {
        const rawResponse = await fetch('https://localhost:7298/api/admin/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonBody),
          
        })
        const content = await rawResponse.json();
        console.log(content);
        if(content.message === "exito"){
          LoginHandler(content,callback)
          window.location.href="index.html"
      }else{
          window.location.href="register.html"
        }
      })();
})

async function LoginHandler(body,callback){
  var json = await body;
  callback(json)
}

