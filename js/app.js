import * as UI from './variables.js';
import { bebidas } from './bebidas.js';
import { mostrarBebidas } from './mostrarBebidas.js';
import { mostrarError } from './mostrarError.js';
import { mostrarResultado } from './mostrarResultado.js';

let bebidasEnCarrito = [];
let click = 1;


cargarEventListener();
function cargarEventListener() {

    //Cuando agregas un curso presionando "Agregar al Carrito"
    UI.mostrarTragos.addEventListener('click', agregarBebida);
    UI.resultado.addEventListener('click', agregarBebidaResultado);

    //Muestra los cursos del carrito
    document.addEventListener('DOMContentLoaded', () => {
        bebidasEnCarrito = JSON.parse( localStorage.getItem('carrito')) || [];
        carritoHTML();
    });

    //Elimina cursos del carrito
    UI.carrito.addEventListener('click', eliminarBebida);


    //Vaciar el carrito
    UI.vaciarCarritoBtn.addEventListener('click', () => {
        bebidasEnCarrito = [];
        limpiarCarrito();
        sincronizarStorage();
        notificarCarrito();
    });

    UI.btnTragos.addEventListener('click', mostrarTodos);
    UI.comprarCarrito.addEventListener('click', comprarCarrito);

    
}
//Comprar las bebidas del Carrito
function comprarCarrito(){
    if ( bebidasEnCarrito.length === 0 ){
        const cartelCompra = document.createElement('div');
        cartelCompra.classList.add('cartel-compra');
        cartelCompra.textContent = 'El Carrito esta vacío';
        UI.cartel.appendChild(cartelCompra);
        setTimeout(()=>{
            UI.cartel.removeChild(cartelCompra);
        },3000);
    }else{
        const cartelCompra = document.createElement('div');
        cartelCompra.classList.add('cartel-compra');
        cartelCompra.textContent = 'Gracias por su compra!';
        UI.cartel.appendChild(cartelCompra);
        setTimeout(()=>{
            UI.cartel.removeChild(cartelCompra);
        },3000);
        bebidasEnCarrito = [];
        limpiarCarrito();
        sincronizarStorage();
        notificarCarrito();
    }
}

//Muestro el listado de Bebidas
function mostrarTodos(){
    if (click === 1) {
        UI.mostrarTragos.classList.add('bebidas-grid');
        UI.btnTragos.textContent = 'Ocultar';
        mostrarBebidas();
        click++;
    }else{
        UI.mostrarTragos.textContent = '';
        UI.mostrarTragos.classList.remove('bebidas-grid');
        UI.btnTragos.textContent = 'Mostrar Tragos';
        click = 1;
    }
}


//Capturo el input para poder mostrar la bebida seleccionada
UI.btnBebida.addEventListener('click', resultadoBebida);

function resultadoBebida(e) { 
    e.preventDefault();
    if ( UI.inputBebida.value === ''){
        mostrarError('Debe ingresar una bebida');
        return;
    }
    const encontrarBebida = bebidas.find( bebida => bebida.nombre.toLowerCase() === UI.inputBebida.value.toLowerCase());
    if( encontrarBebida === undefined ){
        mostrarError('No contamos con la bebida solicitada');
    }else{
        LimpiarHTML();
        mostrarResultado(encontrarBebida);
    }
}

//Limpiar la pantalla para seguir mostrando resultados
export function LimpiarHTML(){
    while( UI.resultado.firstChild ){
      UI.resultado.removeChild( UI.resultado.firstChild );
    }
}

//Funciones para agregar, eliminar bebidas
function agregarBebidaResultado(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
        const bebidaSeleccionada = e.target.parentElement.parentElement;
        leerDatosBebida(bebidaSeleccionada);
    }
}
function agregarBebida(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const bebidaSeleccionada = e.target.parentElement.parentElement;
        leerDatosBebida(bebidaSeleccionada);
    }
}

//Elimina un curso del carrito
function eliminarBebida(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const bebidaId = e.target.getAttribute('data-id');
        bebidasEnCarrito = bebidasEnCarrito.filter( bebida => bebida.id !== bebidaId);
        console.log(bebidasEnCarrito);

        carritoHTML();
    }
}
function leerDatosBebida(bebida) {
    const infoBebida = {
        imagen: bebida.querySelector('.imagen-bebida img').src,
        titulo: bebida.querySelector('h3').textContent,
        precio: bebida.querySelector('p:nth-child(3)').getAttribute('data-precio'),
        id: bebida.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = bebidasEnCarrito.some( bebida => bebida.id === infoBebida.id);
    if (existe) {
        const bebidas = bebidasEnCarrito.map( bebida => {
            if(bebida.id === infoBebida.id) {
                bebida.cantidad++;
                return bebida;
            } else {
                return bebida;
            }
        });
        bebidasEnCarrito = [...bebidas];
    } else {
        bebidasEnCarrito = [...bebidasEnCarrito, infoBebida];
    }
    carritoHTML();
}

//Muestra  el carrito de compras en el HTML
function carritoHTML() {
    limpiarCarrito();
    //Recorre el carrito y genera el HTML
    bebidasEnCarrito.forEach( bebida => {
        const { imagen, titulo, precio, cantidad, id} = bebida;
        const precio2 = parseFloat(precio) * parseFloat(cantidad);
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width= "100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            $${precio2}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href='#' class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        //Agrega el HTML del carrito en el tbody
        UI.contenedorCarrito.appendChild(row);
    });
    notificarCarrito();
    //Agregar el carrito de compras al LocalStorage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(bebidasEnCarrito));
}

function limpiarCarrito() {
    while(UI.contenedorCarrito.firstChild) {
        UI.contenedorCarrito.removeChild(UI.contenedorCarrito.firstChild)
    }
}
function notificarCarrito(){
    if( bebidasEnCarrito.length > 0 ){
        UI.contarCarrito.classList.add('contador');
        UI.contarCarrito.textContent = bebidasEnCarrito.length;
    }else{
        console.log(bebidasEnCarrito.length);
        UI.contarCarrito.classList.remove('contador');
        UI.contarCarrito.textContent = '';
    }
}


