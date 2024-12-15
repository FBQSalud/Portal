const urlLogin = 'http://localhost:7298/api/admin/login';

const buttonLogin = document.getElementById('login');
if (buttonLogin) {
    buttonLogin.addEventListener('click', async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos vacíos',
                text: 'Por favor, completa todos los campos.',
                confirmButtonText: 'Entendido'
            });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            Swal.fire({
                icon: 'warning',
                title: 'Formato de correo inválido',
                text: 'Por favor, ingresa un correo válido.',
                confirmButtonText: 'Entendido'
            });
            return;
        }

        const jsonBody = { email, password };

        try {
            Swal.fire({
                title: 'Iniciando sesión...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await fetch(urlLogin, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonBody),
            });

            Swal.close();

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('authToken', token);
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: 'Redirigiendo al panel...',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "index.html";
                });
            } else if (response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciales incorrectas',
                    text: 'El usuario o contraseña no son válidos.',
                    confirmButtonText: 'Intentar de nuevo'
                });
            } else {
                const error = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Ocurrió un error inesperado.',
                    confirmButtonText: 'Entendido'
                });
            }
        } catch (error) {
            console.error('Error del servidor:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error del servidor',
                text: 'No se pudo conectar al servidor. Inténtalo más tarde.',
                confirmButtonText: 'Entendido'
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const authToken = localStorage.getItem('authToken');

    // Si ya existe un token, redirigir al panel
    if (authToken && window.location.pathname.includes("login.html")) {
        window.location.href = "index.html";
    }
});











