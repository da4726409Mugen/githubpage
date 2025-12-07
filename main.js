// Variables a utilizar
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
let lista = document.querySelector('#lista-carrito thead');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Funciones
function cargarEventListeners() {
    // Escucha el evento click para agregar productos al carrito
    elementos1.addEventListener('click', comprarElemento);

    // Escucha el evento click para eliminar productos del carrito
    carrito.addEventListener('click', eliminarElemento);

    // Escucha el evento click para vaciar todo el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// Llama a la función principal para iniciar los Event Listeners
cargarEventListeners();

// Función para comprar (agregar) un elemento
function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

// Función para leer los datos del elemento seleccionado
function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

// Función para insertar los elementos en el carrito (la tabla)
function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100%">
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;

    lista.appendChild(row);
}

// Función para eliminar un elemento del carrito
function eliminarElemento(e) {
    e.preventDefault();
    let elemento, elementoId;

    if (e.target.classList.contains('borrar')) {
        // Obtenemos el <tr> (la fila) que contiene el elemento a borrar
        elemento = e.target.parentElement.parentElement;
        
        // Obtenemos el ID del producto para referencia (aunque no se usa aquí)
        elementoId = e.target.getAttribute('data-id');

        // Eliminamos la fila de la tabla
        elemento.remove();
    }
}

// Función para vaciar completamente el carrito
function vaciarCarrito() {
    // Mientras haya un primer elemento (firstElementChild) en la lista...
    while (lista.firstChild) {
        // ...remuévelo (removeChild)
        lista.removeChild(lista.firstChild);
    }
    return false;
}