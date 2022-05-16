function cambiaBarraProgreso(n_puntos) {

    // Calculamos el porcentaje según el número de puntos
    let progreso = Math.round(n_puntos / 7) + "%";
    

    // Le aplicamos a la barra el porcentaje
    barraProgreso.style.width = progreso;
    $(barraProgreso).text(n_puntos + " / 7")
    
}

function restablecerBarra() {
    barraProgreso.style.width = "0%";
}