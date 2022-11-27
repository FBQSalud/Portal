const urlUsers = 'https://localhost:7297/api/users'

export const registerUser=()=> {
    let userPostBody = {
        username : document.getElementById("userName").value,
        email : document.getElementById("email").value,
        roleId : document.getElementById("empleado").value,
        password : document.getElementById("password").value
        
    };
    console.log(userPostBody);

    (async () => {
        const rawResponse = await fetch(`${urlUsers}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userPostBody)
        });
        const content = await rawResponse.json();
        
        console.log(content);
        if (typeof(content.userId) != "undefined") {
          registerAdress(content.userId)
          window.location.href="../login"
        }
        else{
          window.location.href="../register"
        }
      })();
}
