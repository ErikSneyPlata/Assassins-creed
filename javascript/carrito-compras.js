document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/database-tienda.json')
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    mostrarCarrito();

    const cartIcon = document.querySelector('.cart-icon');
    const cart = document.querySelector('.cart');

    cartIcon.addEventListener('click', () => {
        cart.classList.toggle('show');
    });
    
});



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
    console.log('Total en el carrito:', totalItems); // Verificar el número total de productos
    document.querySelector('.cart-count').textContent = totalItems;
}

