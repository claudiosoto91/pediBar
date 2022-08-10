//Muestro toda la lista de Bebidas
import { bebidas } from './bebidas.js';
import * as UI from './variables.js';

export function mostrarBebidas(){
    bebidas.map(bebida =>{
        const divBebida = document.createElement('div');
        divBebida.classList.add('bebida');

        const divImagen = document.createElement('div');
        divImagen.classList.add('imagen-bebida');
        divImagen.innerHTML = `<img src='${bebida.url}' alt='imagen bebida'>`;

        const divInfo = document.createElement('div');
        divInfo.classList.add('info-bebida');
        const tituloBebida = document.createElement('h3');
        tituloBebida.textContent = bebida.nombre;
        const ingredientes = document.createElement('p');
        ingredientes.textContent = bebida.ingredientes;
        const precioBebida = document.createElement('p');
        precioBebida.setAttribute('data-precio', bebida.precio);
        precioBebida.textContent = `$${bebida.precio}`;
        const btnBebida = document.createElement('a');

        btnBebida.setAttribute('data-id',`${bebida.id}`);
        if ( !bebida.stock ){
            btnBebida.classList.add('btn-bebida', 'anular');
            btnBebida.textContent = 'Sin Stock';
        }else{
            btnBebida.classList.add('btn-bebida', 'agregar-carrito');
            btnBebida.textContent = 'Agregar';
        }
        divInfo.appendChild(tituloBebida);
        divInfo.appendChild(ingredientes);
        divInfo.appendChild(precioBebida);
        divInfo.appendChild(btnBebida);

        divBebida.appendChild(divImagen);
        divBebida.appendChild(divInfo);

        UI.mostrarTragos.appendChild(divBebida);
    });
}
