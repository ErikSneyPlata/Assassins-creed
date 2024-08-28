document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/database-tienda.json')
        .then(response => response.json())
        .then(data => {
            mostrarJuegos(data);
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    // Mostrar el carrito cuando se carga la página
    mostrarCarrito();

    // Mostrar u ocultar el carrito al hacer clic en el ícono del carrito
    const cartIcon = document.querySelector('.cart-icon');
    const cart = document.querySelector('.cart');

    cartIcon.addEventListener('click', () => {
        cart.classList.toggle('show');
    });
});

function mostrarJuegos(juegos) {
    const container = document.querySelector('.game-grid');

    juegos.forEach(juego => {
        const juegoDiv = document.createElement('div');
        juegoDiv.className = 'game-card';

        const plataformas = Array.isArray(juego.Plataformas[0]) ? juego.Plataformas[0] : juego.Plataformas;

        juegoDiv.innerHTML = `
            <img src="${juego.imagen}" alt="${juego.name}" />
            <h2>${juego.name}</h2>
            <p>Lanzamiento: ${juego.Lanzamiento}</p>
            <p>Plataformas: ${plataformas.join(', ')}</p>
            <p>Precio: $${juego.precio}</p>
            <a href="#" class="buy-button" data-id="${juego.id}" data-name="${juego.name}" data-price="${juego.precio}">Comprar</a>
        `;

        container.appendChild(juegoDiv);
    });

    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', handleBuyButtonClick);
    });
}

function handleBuyButtonClick(event) {
    event.preventDefault();
    const button = event.target;
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    agregarAlCarrito({ id, name, price });
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    carrito.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <span>Cantidad: ${item.cantidad}</span>
            <button class="remove-button" data-id="${item.id}">Eliminar</button>
        `;

        cartItemsContainer.appendChild(itemDiv);
    });

    const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);
    document.getElementById('cart-total-price').textContent = total.toFixed(2);

    // Actualizar el contador del carrito
    actualizarContadorCarrito();
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-button')) {
        const id = event.target.getAttribute('data-id');
        eliminarDelCarrito(id);
    }
});

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}


function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    console.log('Total Items en el carrito:', totalItems); // Verificar el número total de productos
    document.querySelector('.cart-count').textContent = totalItems;
}

