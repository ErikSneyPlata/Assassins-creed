localStorage.setItem('test', 'funciona');
console.log(localStorage.getItem('test'));

// Registro de usuario
document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("banderaxxx")

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    console.log("banderayyy")

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    console.log("bandera")
    // Guardar la información en localStorage
    const user = {
        username,
        email,
        password
    };
    console.log("bandera1")



    localStorage.setItem('user', JSON.stringify(user));
    console.log("bandera2")

    alert('Registro exitoso');
    window.location.href = "/login.html";
});

