document.addEventListener("DOMContentLoaded", () => {
    // Evitar ejecutar en login.html
    if (window.location.pathname.includes("login.html")) return;

    const logoutButton = document.getElementById("logoutButton");
    const authToken = localStorage.getItem("authToken");
    const userNameElement = document.getElementById("userName");
    const userEmailElement = document.getElementById("userEmail");
    const authOptionsElement = document.getElementById("authOptions");

    // Manejar el estado de autenticación
    if (authToken) {
        // Simula obtener datos del usuario (puedes reemplazarlo con una solicitud al backend)
        const userData = JSON.parse(localStorage.getItem("userData")) || {
            name: "Claudio",
            email: "Claudio@FBQ.Salud.com",
        };

        // Actualiza el nombre y correo del usuario
        if (userNameElement) {
            userNameElement.innerHTML = `<a href="#">${userData.name}</a>`;
        }
        if (userEmailElement) {
            userEmailElement.textContent = userData.email;
        }

        // Oculta las opciones de "Registrarse" si existen
        if (authOptionsElement) {
            authOptionsElement.style.display = "none";
        }
    } else {
        // Usuario no autenticado: mostrar datos por defecto
        if (userNameElement) {
            userNameElement.innerHTML = `<a href="login.html">Usuario</a>`;
        }
        if (userEmailElement) {
            userEmailElement.textContent = "";
        }
    }

    // Configurar evento de logout
    if (logoutButton) {
        logoutButton.addEventListener("click", (event) => {
            event.preventDefault();

            // Eliminar datos de autenticación del localStorage
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");

            // Mostrar mensaje de confirmación
            Swal.fire({
                icon: "success",
                title: "Sesión cerrada",
                text: "Has cerrado sesión correctamente.",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            }).then(() => {
                // Redirigir al login
                window.location.href = "login.html";
            });
        });
    } else {
        console.warn("El botón logoutButton no se encontró en el DOM.");
    }
});




