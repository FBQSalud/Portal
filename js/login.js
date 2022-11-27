

const LoginUser=(callback) =>{
    let jsonBody = {
        email : document.getElementById("email").value,
        password : document.getElementById("password").value,
    };
    (async () => {
        const rawResponse = await fetch('https://localhost:7297/api/admin/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonBody)
        });
        const content = await rawResponse.json();
        if(content.status === "Success"){
            LoginHandler(content,callback)
            window.location.href="../index"
        }else{
            window.location.href="../registered"
        }
      })();
}

async function LoginHandler(body,callback){
  var json = await body;
  callback(json)
}