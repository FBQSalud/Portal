document.addEventListener("DOMContentLoaded", () => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken && !window.location.pathname.includes("login.html")) {
        // Usuario no autenticado, mostrar alerta y redirigir al login
        Swal.fire({
            icon: 'warning',
            title: 'Sesión no iniciada',
            text: 'Debes iniciar sesión para acceder al panel.',
            confirmButtonText: 'Entendido',
        }).then(() => {
            window.location.href = "login.html";
        });
    } else if (authToken && window.location.pathname.includes("login.html")) {
        // Usuario autenticado intenta acceder al login, redirigir al panel
        window.location.href = "index.html";
    }
});

