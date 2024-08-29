// localStorage.setItem('test', 'funciona');
// console.log(localStorage.getItem('test'));

// // Registro de usuario
// console.log(localStorage.getItem("user"))

document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("banderaxxx")

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
 // key - value
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    console.log("bandera")
    // Guardar la información
    const user = {
        username,
        password,
        "compras":[]
    };


    console.log(username.value)
    console.log("bandera1")

    console.log(username)

    localStorage.setItem(email, JSON.stringify(user));

    alert('Registro exitoso');
    window.location.href = "../html/login.html";
});


// get_data_localStorage(){

// }
