// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/database-tienda.json') // Ruta al archivo JSON con los datos de los juegos
        .then(response => response.json()) // Parsear el JSON
        .then(data => {
            mostrarJuegos(data); // Llamar a la función con los datos de los juegos
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

// Función para mostrar los juegos en la página
function mostrarJuegos(juegos) {
    const container = document.querySelector('.game-grid'); // Seleccionar el contenedor donde se mostrarán los juegos

    juegos.forEach(juego => {
        const juegoDiv = document.createElement('div'); // Crear un div para cada juego
        juegoDiv.className = 'game-card'; // Asignar la clase para el estilo

        const plataformas = Array.isArray(juego.Plataformas[0]) ? juego.Plataformas[0] : juego.Plataformas;

        juegoDiv.innerHTML = `
            <img src="${juego.imagen}" alt="${juego.name}" /> <!-- Imagen del juego -->
            <h2>${juego.name}</h2> <!-- Nombre del juego -->
            <p>Lanzamiento: ${juego.Lanzamiento}</p> <!-- Año de lanzamiento -->
            <p>Plataformas: ${plataformas.join(', ')}</p> <!-- Plataformas disponibles -->
            <p>Precio: $${juego.precio}</p> <!-- Precio del juego -->
            <a href="#" class="buy-button" data-id="${juego.id}" data-name="${juego.name}" data-price="${juego.precio}">Comprar</a> <!-- Botón de compra -->
        `;

        container.appendChild(juegoDiv);
    });

    const buyButtons = document.querySelectorAll('.buy-button'); 
    buyButtons.forEach(button => {
        button.addEventListener('click', handleBuyButtonClick); 
    });
}
