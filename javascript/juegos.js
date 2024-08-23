const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (loggedInUser) {
    document.getElementById('user-info').innerHTML = `<p>Hola, ${loggedInUser.username}</p>`;
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
    window.location.href = '/juegos.html'; // Redirigir a la página de inicio después de cerrar sesión
});