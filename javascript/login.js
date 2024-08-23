document.addEventListener('DOMContentLoaded', function() {
    const emailElement = document.getElementById('floatingInput');
    const passwordElement = document.getElementById('floatingPassword');

    if (!emailElement || !passwordElement) {
        console.error('No se pudo encontrar los elementos de correo electrónico o contraseña.');
        return;
    }

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = emailElement.value;
        const password = passwordElement.value;

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && email === storedUser.email && password === storedUser.password) {
            localStorage.setItem('loggedInUser', JSON.stringify(storedUser));
            window.location.href = '/index.html';
        } else {
            alert('Correo electrónico o contraseña incorrectos.');
        }
    });
});