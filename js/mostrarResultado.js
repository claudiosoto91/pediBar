import * as UI from './variables.js';
//Muestra el resultado de la bebida buscada
export function mostrarResultado(bebidaElegida){
    const divBebida = document.createElement('div');
    divBebida.classList.add('bebida');

    const divImagen = document.createElement('div');
    divImagen.classList.add('imagen-bebida');
    divImagen.innerHTML = `<img src='${bebidaElegida.url}' alt='imagen bebida'>`;

    const divInfo = document.createElement('div');
    divInfo.classList.add('info-bebida');
    const tituloBebida = document.createElement('h3');
    tituloBebida.textContent = bebidaElegida.nombre;
    const ingredientes = document.createElement('p');
    ingredientes.textContent = bebidaElegida.ingredientes;
    const precioBebida = document.createElement('p');
    precioBebida.setAttribute('data-precio', bebidaElegida.precio);
    precioBebida.textContent = `$${bebidaElegida.precio}`;
    const btnBebida = document.createElement('a');
    btnBebida.classList.add('btn-bebida','agregar-carrito');
    btnBebida.textContent = 'Agregar';
    btnBebida.setAttribute('data-id',`${bebidaElegida.id}`);

    divInfo.appendChild(tituloBebida);
    divInfo.appendChild(ingredientes);
    divInfo.appendChild(precioBebida);
    divInfo.appendChild(btnBebida);

    divBebida.appendChild(divImagen);
    divBebida.appendChild(divInfo);

    UI.resultado.appendChild(divBebida);
}