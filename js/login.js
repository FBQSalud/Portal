const urlLogin = 'http://localhost:7298/api/admin/login';
const buttonLogin = document.getElementById('login');

// Validar si el botón existe en el DOM
if (!buttonLogin) {
    console.error('El botón login no se encontró en el DOM.');
} else {
    buttonLogin.addEventListener('click', async () => {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validar campos vacíos
        if (!email || !password) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos vacíos',
                text: 'Por favor, completa todos los campos.',
                confirmButtonText: 'Entendido'
            });
            return;
        }

        // Validar formato del correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'warning',
                title: 'Formato de correo inválido',
                text: 'Por favor, ingresa un correo válido.',
                confirmButtonText: 'Entendido'
            });
            return;
        }

        let jsonBody = { email, password };

        try {
            // Mostrar loader mientras se procesa la solicitud
            Swal.fire({
                title: 'Iniciando sesión...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Realizar la solicitud al backend
            const rawResponse = await fetch(urlLogin, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonBody),
            });

            // Cerrar el loader
            Swal.close();

            // Procesar respuesta
            if (rawResponse.ok) {
                const content = await rawResponse.json();

                // Mostrar mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: 'Redirigiendo al panel...',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                }).then(() => {
                    // Guardar token en localStorage y redirigir
                    localStorage.setItem('authToken', content.token);
                    window.location.href = "index.html";
                });

            } else if (rawResponse.status === 401) {
                // Mostrar mensaje de error de credenciales
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciales incorrectas',
                    text: 'El usuario o contraseña no son válidos.',
                    confirmButtonText: 'Intentar de nuevo'
                });
            } else {
                // Manejar otros errores del backend
                const errorContent = await rawResponse.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorContent.message || 'Ocurrió un error inesperado.',
                    confirmButtonText: 'Entendido'
                });
            }
        } catch (error) {
            // Manejar errores de red o del servidor
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


