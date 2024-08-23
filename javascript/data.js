// Registro de usuario
document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Guardar la información en localStorage
    const user = {
        username,
        email,
        password
    };

    localStorage.setItem('user', JSON.stringify(user));

    alert('Registro exitoso');
    window.location.href = "/login.html";
});

// Inicio de sesión de usuario
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;

    // Obtener el usuario registrado del localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && email === storedUser.email && password === storedUser.password) {
        // Guardar la información del usuario en loggedInUser para la sesión actual
        localStorage.setItem('loggedInUser', JSON.stringify(storedUser));

        // Redirigir a la página de inicio
        window.location.href = '/index.html';
    } else {
        alert('Correo electrónico o contraseña incorrectos.');
    }
});

// Código en el index.html
// Verificar si el usuario está autenticado
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (loggedInUser) {
    document.getElementById('user-info').innerHTML = `<p>Bienvenido, ${loggedInUser.username}</p>`;
    document.getElementById('logout-button').style.display = 'inline-block';
    document.getElementById('login-link').style.display = 'none';
} else {
    document.getElementById('user-info').innerHTML = '';
    document.getElementById('logout-button').style.display = 'none';
    document.getElementById('login-link').style.display = 'inline-block';
}

// Manejar el cierre de sesión
document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/index.html'; // Redirigir a la página de inicio después de cerrar sesión
});

