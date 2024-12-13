// Obtener el botón de cerrar sesión
const logoutButton = document.getElementById('logoutButton');

if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        // Eliminar el token de autenticación
        localStorage.removeItem('authToken');

        // Mostrar mensaje de confirmación (usando SweetAlert)
        Swal.fire({
            icon: 'success',
            title: 'Sesión cerrada',
            text: 'Has cerrado sesión correctamente.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        }).then(() => {
            // Redirigir al login después de mostrar el mensaje
            window.location.href = "login.html";
        });
    });
}

