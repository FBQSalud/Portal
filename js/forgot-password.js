const forgotPasswordForm = document.getElementById("forgotPasswordForm");

if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evitar el envío por defecto del formulario

        const email = document.getElementById("email").value;

        if (!email) {
            Swal.fire({
                icon: "warning",
                title: "Correo vacío",
                text: "Por favor, ingresa tu correo electrónico.",
                confirmButtonText: "Entendido"
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:7298/api/admin/forgot-password', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email })
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Instrucciones enviadas",
                    text: "Revisa tu correo electrónico para restablecer tu contraseña.",
                    confirmButtonText: "Aceptar"
                }).then(() => {
                    window.location.href = "login.html";
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: result.message || "No se pudo enviar el correo. Inténtalo de nuevo.",
                    confirmButtonText: "Aceptar"
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error del servidor",
                text: "Hubo un problema al intentar enviar las instrucciones. Inténtalo más tarde.",
                confirmButtonText: "Aceptar"
            });
        }
    });
}

