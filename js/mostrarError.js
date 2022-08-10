import * as UI from './variables.js';

//Mostrar error en pantalla
export function mostrarError(mensaje){
    const existeError = document.querySelector('.error');
    if ( !existeError ){
        const parrafoError = document.createElement('p')
        parrafoError.classList.add('error');
        parrafoError.textContent = mensaje;
        UI.labelBebida.insertAdjacentElement("beforebegin", parrafoError);
        setTimeout(()=>{
            parrafoError.remove();
        },3000);
    }
}