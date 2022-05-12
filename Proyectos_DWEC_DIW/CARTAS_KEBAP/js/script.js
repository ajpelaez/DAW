let puntuacionTexto = $("#puntuacionTexto");
let puntuacionTextoRanking = $("#puntuacionTextoRanking");

let errorTexto = $("#errorTexto");
let top_player = $("#top-player");
let idiomaTexto = $("#idiomaTexto");
let descripcion = $("#descripcion");

let botonEsp = $("#es");
let botonEng = $("#en");

let barra_informativa = $("#barra-informativa");

let contador_puntos = $("#contador-puntos");
let contador_errores = $("#contador-errores");

let errores = 0;

let nombre = "";
let nick = $("#nick");

let caja_invisible = $("#invisible")[0];

let sonidoCambiarCarta = $('.cambiar')[0];
let sonidoError = $('.error')[0];
let sonidoVictoria = $('.victoria')[0];
let sonidoBomba = $('.bomba')[0];

$(document).ready(function() {
    // Pedimos el nombre del jugador
    let pedirNombre = () => {
        nombre = prompt("Dime tu nick:");
        $("#nick").text(nombre);
    }

    // Restablece los datos
    let restablecer = () => {
        // Celdas DIV del DOM
        celdaImagen1 = 0;
        celdaImagen2 = 0;

        // Valores que tienen los DIVs
        kebabValor1 = 0;
        kebabValor2 = 0;
    }

    let comenzarJuego = () => {
        // Inicalización de variables, llama al método para inicializar las variables a 0
        restablecer();

        // Reinicialización de los contadores de puntos y errores
        contador_puntos.text("0");
        contador_errores.text("0");
        errores = 0;

        //pedirNombre();

        anadirListenerYValueACartas();

        // Le aplica el texto a los elementos del DOM las variables guardadas en web storage
        $("#ranking-jugador").text(localStorage.getItem("Jugador"));
        $("#ranking-puntuacion").text(localStorage.getItem("Ranking"));
    }

    // Comienza el juego al cargar la página
    comenzarJuego();
    //$(window).load(comenzarJuego());


    function comprobarValores(carta, kebab_pulsado) {
        if (celdaImagen2 > 0) {
            celdaImagen1 = 0;
            celdaImagen2 = 0;
        }

        // Comprobamos si las dos variables de celdas ya tienen un valor, les asignamos el target
        if (celdaImagen1 == 0) {
            celdaImagen1 = carta;
        } else {
            celdaImagen2 = carta;
        }

        // Cambiamos el contenido de la primera celda para que aparezca la imagen según su valor
        carta.innerHTML = "<img src='images/kebabs/kebab" + kebab_pulsado + ".jpg' class='imagen'>";

        if (kebabValor2 > 0) {
            kebabValor1 = 0;
            kebabValor2 = 0;
        }

        // Comprobamos si las dos variables de kebabs ya tienen un valor, les asignamos el kebab pulsado
        if (kebabValor1 == 0 || celdaImagen1 == celdaImagen2) {
            kebabValor1 = kebab_pulsado;
        } else {
            kebabValor2 = kebab_pulsado;
        }
    }

    function detenPagina() {
        window.setTimeout(() => {
            // Restablecemos el innerHTML para quitar la imagen
            celdaImagen1.innerHTML = "";
            celdaImagen2.innerHTML = "";

            // Restablecemos los valores
            restablecer();

            // Suma del contador de errores
            errores++;
            contador_errores.text(errores);

            // Quita la caja invisible
            caja_invisible.style.display = "none";
        }, 500);
    }

    function anadeSombraYQuitaListener() {
        // Guardamos las celdas pulsadas en un array, cogiendo los divs cuyos valores sean el de los kebabs pulsados
        let celdas_pulsadas = $("div[value='" + kebabValor1 + "']");

        // A cada celda le añadimos la sombra y le quitamos el listener de click
        celdas_pulsadas[0].classList.add("sombra");
        $(celdas_pulsadas[0]).unbind('click');
        celdas_pulsadas[1].classList.add("sombra");
        $(celdas_pulsadas[1]).unbind('click');
    }

    function quitarSombraYAnadirListenerATodosLosDivs() {
        let celdas = $(".celda");

        for (let i = 0; i < celdas.length; i++) {
            celdas[i].classList.remove("sombra");
            celdas[i].innerHTML = "";
        }

        celdas.click(comprobarCartas);
    }

    function comprobarRanking() {
        if (errores < parseInt(localStorage.getItem("Ranking")) || localStorage.getItem("Ranking") == null) {
            localStorage.setItem("Ranking", errores);
            localStorage.setItem("Jugador", nombre);
        }
    }

    function comprobarPuntuacion() {
        if (parseInt(contador_puntos.text()) == 6) {
            // Cambiamos el estado de la barra informativa
            barraInformativaTexto("message_victory");

            alert("¡Felicidades! Has ganado el juego. Tuviste un total de " + contador_errores.text() + " errores");

            // Quitamos la sombra a todas las celdas y les volvemos a añadir el listener
            quitarSombraYAnadirListenerATodosLosDivs();

            // Si el número de errores es menor que el de el récord o la cookie no existe, guardamos los valores
            comprobarRanking();

            // Vuelve a comenzar el juego
            comenzarJuego();
        }
    }

    function stopSonidoCambio() {
        sonidoCambiarCarta.pause();
        sonidoCambiarCarta.currentTime = 0;
    }

    function stopSonidoError() {
        sonidoError.pause();
        sonidoError.currentTime = 0;
    }

    function stopSonidoVictoria() {
        sonidoVictoria.pause();
        sonidoVictoria.currentTime = 0;
    }

    function comprobarCartas(carta) {
        carta = carta.currentTarget;
        // Guardamos el value del evento seleccionado
        //alert($(carta));
        let kebab_pulsado = carta.getAttribute("value");

        // Comprobamos que tiene un valor
        if (kebab_pulsado != null) {
            //Sonido cambiar carta
            stopSonidoError();
            stopSonidoVictoria();
            sonidoCambiarCarta.play();

            comprobarValores(carta, kebab_pulsado);

            // Comprobamos que las imágenes sean distintas y que kebab 2 tenga un valor
            if (kebabValor1 != kebabValor2 & kebabValor2 > 0) {
                stopSonidoCambio();
                stopSonidoVictoria();
                sonidoError.play();

                // Cambia el contenido de la barra informativa
                barraInformativaTexto("message_mistake");

                // Cambiamos el contenido de la segunda celda según su valor de kebab
                celdaImagen2.innerHTML = "<img src='images/kebabs/kebab" + celdaImagen2.getAttribute('value') + ".jpg' class='imagen'>";

                // Añade una caja invisible que impide seleccionar más cartas
                caja_invisible.style.display = "block";

                // Detiene la página unos instantes y restablece el innerHTML para que se borre la imagen
                detenPagina();
                // Comprobamos que los valores son idénticos (se han acertado las cartas)
            } else if (kebabValor1 == kebabValor2 && celdaImagen1 != celdaImagen2) {
                stopSonidoCambio();
                stopSonidoError();

                sonidoVictoria.play();
                
                // Les ponemos una sombra y les quitamos el listener
                anadeSombraYQuitaListener();

                // Sumamos el contador y restablecemos el juego
                contador_puntos.text((parseInt(contador_puntos.text()) + 1));

                // Cambia el contenido de la barra informativa
                barraInformativaTexto("message_success");

                // Restablecemos los valores
                restablecer();

                // Comprobamos que la puntuación sea de 6 (se ha terminado el juego)
                comprobarPuntuacion();
            }
        }
    }

    function establecerValor(div, lista) {
        // Genera un número aleatorio entre lo que hay en el array lista
        let index = Math.floor(Math.random() * lista.length);

        // Le aplicamos un valor a la celda con el elemento aleatorio de la lista
        $(div).attr('value', lista[index]);

        // Quitamos de la lista el elemento
        lista.splice(index, 1);
    }

    // Recorremos el array para añadirle un listener a todas las celdas y les establecemos un value
    function anadirListenerYValueACartas() {
        // Lista que contiene los valores (se repiten porque tiene que salir el mismo número 2 veces)
        let lista = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8];

        for (let i = 0; i < $(".celda").length; i++) {
            establecerValor($(".celda")[i], lista);
        }

        $(".celda").click(comprobarCartas);
    }

    function cambiarTextoIdioma(boton) {
        // Guarda en el web storage el idioma
        localStorage.setItem("idioma", boton.currentTarget.id);

        loadLanguage();
    }

    // Les ponemos un listener a los botones de español e inglés
    botonEsp.click(cambiarTextoIdioma);
    botonEng.click(cambiarTextoIdioma);
});