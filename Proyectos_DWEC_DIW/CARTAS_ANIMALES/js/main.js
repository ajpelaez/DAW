$(document).ready(function() {

    // Carga la lista de mejores jugadores al cargar el juego
    cargarRanking();

    function comprobarDificultad() {
        // Si la dificultad es fácil, ponemos disponible el botón de mostrar cartas y no aparece bomba
        if (boton_facil.is(':checked')) {
            dificultad = "facil";
            botonMostrarCartas.attr('disabled', null);
 

            pulsadoBotonMostrar = false;
            listaDeCartasAcertadas = [];

            botonMostrarCartas.click(mostrarCartas);

            if ($(".celda").length == 15) {
                $("#container").find('div:first').remove();
            }
        } else if (boton_normal.is(':checked')) {
            dificultad = "normal";
        } else if (boton_dificil.is(':checked')) {
            dificultad = "dificil";
        } else if (boton_leyenda.is(":checked")) {
            dificultad = "leyenda";
        }
    }



    // Restablece datos
    function restablecer() {
        // Celdas DIV del DOM
        celdaImagen1 = 0;
        celdaImagen2 = 0;

        // Valores que tienen los DIVs
        fichaValor1 = 0;
        fichaValor2 = 0;
    }


    function mostrarCartas() {
        let arrayCartas = $('.celda');

        // Quitamos el botón de mostrar
        botonMostrarCartas.attr('disabled', 'disabled');

        // Si no se ha pulsado el botón, le damos la vuelta a todas las cartas salvo las acertadas
        if (!pulsadoBotonMostrar) {
            pulsadoBotonMostrar = true;

            caja_invisible.style.display = "block";

            // Damos la vuelta a las cartas
            for (i = 0; i < arrayCartas.length; i++) {
                arrayCartas[i].innerHTML = "<img src='images/animales/ficha" + $(arrayCartas[i]).data('valor') + ".jpg' class='imagen'>";
            }

            // Detenemos la página para ver las cartas y les damos la vuelta de nuevo
            window.setTimeout(() => {
                for (i = 0; i < arrayCartas.length; i++) {
                    if (!listaDeCartasAcertadas.includes(arrayCartas[i])) {
                        arrayCartas[i].innerHTML = "";
                    }
                }

                // Quita la caja invisible
                caja_invisible.style.display = "none";
            }, 2000);
        }
    }


    function comenzarJuego() {
        // Quitamos los listeners a todas las cartas
        $(".celda").off("click");

        // Comprobamos la dificultad
        comprobarDificultad();

        // Cogemos el nombre del jugador y la dificultad
        nombre = nombre_modal.val();
        nick.text(nombre);

        // Cerramos la ventana modal
        ventana_modal.modal('hide');

        // Inicalización de variables, llama al método para inicializar las variables a 0
        restablecer();

        // Reinicialización de los contadores de puntos y errores
        contador_puntos.text("0");
        contador_errores.text("0");
        errores = 0;
        puntos = 0;

        // Restablecemos los DIVs y cambiamos el texto de los botones
        boton_comenzar.attr("data-estado", "started");
        loadLanguage();
        quitarSombraATodosLosDivs();

        anadirListenerYDataACartas();

        restablecerBarra();

    }


    function bombaPulsada(carta) {
        // Sonido de bomba
        stopSonidoError();
        stopSonidoVictoria();
        stopSonidoCambio();

        sonidoBomba.play();

        // Muestra la ventana modal de fallo
        modal_bomba.modal("show");

        // Al cerrar el botón se resetea el juego
        $("#modal_bomba_boton_cerrar").click(function() {
            // Cerramos la ventana modal
            modal_bomba.modal("hide");

            // Dejamos que se muestre la carta bomba
            carta.innerHTML = "";

            // Restablecemos los valores
            restablecer();

            // Reseteamos los puntos
            puntos = 0;
            contador_puntos.text("0");

            // Reseteamos el juego
            $(".celda").off();

            quitarSombraATodosLosDivs();

            anadirListenerYDataACartas();

            restablecerBarra();
        });
    }

    function abrirVentanaModal() {
        // Cierra la ventana modal de victoria
        modal_victoria.modal('hide');

        // Abre la ventana y añade el listener de comenzar
        ventana_modal.modal('show');
        nombre_modal.focus();

        boton_comenzar_modal.click(comenzarJuego);
    }

    // Añade el listener de abrir la ventana
    boton_comenzar.click(abrirVentanaModal);

    function comprobarValores(carta, ficha_pulsado) {
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
        $(carta).fadeOut(200, function() {
            carta.innerHTML = "<img src='images/animales/ficha" + ficha_pulsado + ".jpg' class='imagen'>";
        });


        $(carta).fadeIn(200);

        if (fichaValor2 > 0) {
            fichaValor1 = 0;
            fichaValor2 = 0;
        }

        // Comprobamos si las dos variables de fichas ya tienen un valor, les asignamos la ficha pulsado
        if (fichaValor1 == 0 || celdaImagen1 == celdaImagen2) {
            fichaValor1 = ficha_pulsado;
        } else {
            fichaValor2 = ficha_pulsado;
        }

        // Comprobamos que se ha pulsado la carta bomba
        if (ficha_pulsado == 8) {
            bombaPulsada(carta);
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


        // Comprobamos la dificultad leyenda y los errores acumulados
        if (dificultad == "leyenda" && errores == 1) {
            // Muestra la ventana modal de derrota
            modal_leyenda.modal("show");

            // Al cerrar la ventana se restablece el juego
            $("#modal_leyenda_boton_cerrar").click(function() {
                modal_leyenda.modal("hide");
                comenzarJuego();
            });
        }
    }


    function anadeSombraYQuitaListener(celdaImagen1, celdaImagen2) {
        // A cada celda le añadimos la sombra y le quitamos el listener de click
        listaDeCartasAcertadas.push(celdaImagen1);
        listaDeCartasAcertadas.push(celdaImagen2);

        celdaImagen1.classList.add("sombra");
        $(celdaImagen1).off('click');
        celdaImagen2.classList.add("sombra");
        $(celdaImagen2).off('click');
    }

    function quitarSombraATodosLosDivs() {
        let celdas = $(".celda");

        for (let i = 0; i < celdas.length; i++) {
            celdas[i].classList.remove("sombra");
            celdas[i].innerHTML = "";
        }
    }


    function comprobarPuntuacion() {
        if (puntos == 7) {
            // Cambiamos el estado de la barra informativa
            barraInformativaTexto("message_victory");

            // Muestra el mensaje de victoria
            modal_victoria.modal('show');
            $(modal_contenido).text("Enhorabuena!!! Has ganado el juego. Has tenido un total de " + errores + " errores");

            //Ponemos la barra de progeso al 0
            restablecerBarra();

            // Si el número de errores es menor que el de el récord o la cookie no existe, guardamos los valores
            comprobarRanking();

            // Comienza el juego al cerrar la ventana
            $("#modal_victoria_boton_cerrar").click(function() {
                // Vuelve a comenzar el juego
                abrirVentanaModal();
            })
        }
    }


    function comprobarCartas(carta) {
        carta = carta.currentTarget;

        // Guardamos el valor del evento seleccionado
        let ficha_pulsado = $(carta).data("valor");

        // Comprobamos que tiene un valor
        if (ficha_pulsado != null) {
            ///Sonido cambiar carta
            stopSonidoError();
            stopSonidoVictoria();
            sonidoCambiarCarta.play();

            comprobarValores(carta, ficha_pulsado);

            // Comprobamos que las imágenes sean distintas y que ficha 2 tenga un valor
            if (fichaValor1 != fichaValor2 & fichaValor2 > 0) {
                stopSonidoCambio();
                stopSonidoVictoria();
                sonidoError.play();

                // Cambia el contenido de la barra informativa
                barraInformativaTexto("message_mistake");

                // Cambiamos el contenido de la segunda celda según su valor de ficha
                celdaImagen2.innerHTML = "<img src='images/animales/ficha" + $(celdaImagen2).data('valor') + ".jpg' class='imagen'>";

                // Añade una caja invisible que impide seleccionar más cartas
                caja_invisible.style.display = "block";

                // Detiene la página unos instantes y restablece el innerHTML para que se borre la imagen
                detenPagina();

                // Comprobamos que los valores son idénticos (se han acertado las cartas)
            } else if (fichaValor1 == fichaValor2 && celdaImagen1 != celdaImagen2) {
                stopSonidoCambio();
                stopSonidoError();

                sonidoVictoria.play();

                // Les ponemos una sombra y les quitamos el listener
                anadeSombraYQuitaListener(celdaImagen1, celdaImagen2);

                // Sumamos el contador y restablecemos el juego
                puntos++;
                contador_puntos.text(puntos);

                // Añadir mas recorrido a la barra de progreso
                cambiaBarraProgreso(puntos);

                // Cambia el contenido de la barra informativa
                barraInformativaTexto("message_success");

                // Restablecemos los valores
                restablecer();

                // Comprobamos que la puntuación sea de 6 (se ha terminado el juego)
                comprobarPuntuacion();
            }
        }
    }


    function mostrarCartaBomba(carta_bomba) {
        let tiempo_que_aparece_la_bomba = 0;

        // Según la dificultad cambia el tiempo que carta la bomba en aparecer
        switch (dificultad) {
            case "normal":
                tiempo_que_aparece_la_bomba = 2000;
                break;
            case "leyenda":
                tiempo_que_aparece_la_bomba = 1000;
                break;
        }


        // Aparece la carta bomba
        $(carta_bomba).html("<img src='images/animales/ficha8.jpg' class='imagen'>");
        invisible.style.display = "block";

        // Desaparece la carta bomba tras el tiempo establecido
        window.setTimeout(function() {
            $(carta_bomba).html("");
            invisible.style.display = "none";
        }, tiempo_que_aparece_la_bomba);
    }


    function establecerValor(div, lista) {
        // Genera un número aleatorio entre lo que hay en el array lista
        let index = Math.floor(Math.random() * lista.length);

        let num_aleatorio = lista[index];

        // Le aplicamos un valor a la celda con el elemento aleatorio de la lista
        $(div).data('valor', num_aleatorio);

        // Si el número aleatorio es el 8 (carta bomba) y la dificultad es la normal
        // o la leyenda se dará la vuelta durante un tiempo estimado
        if (num_aleatorio == 8 && (dificultad == "normal" || dificultad == "leyenda")) {
            mostrarCartaBomba($(div));
        }

        // Quitamos de la lista el elemento
        lista.splice(index, 1);
    }



    // Recorremos el array para añadirle un listener a todas las celdas y les establecemos un valor de DATA
    function anadirListenerYDataACartas() {
        // Lista que contiene los valores (se repiten porque tiene que salir el mismo número 2 veces)
        let lista = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];

        // Si la dificultad es normal o difícil añadimos una celda nueva y añadimos el número 8 a la lista (carta bomba)
        if (dificultad != "facil") {
            if ($(".celda").length == 14) {
                $("#container").append('<div class="celda mx-2 my-2 rowc"></div>');
            }

            lista.push(8);
        }

        for (let i = 0; i < $(".celda").length; i++) {
            establecerValor($(".celda")[i], lista);
        }

        $(".celda").click(comprobarCartas);
    }
    

    // Les ponemos un listener a los botones de español e inglés
    botonEsp.click(cambiarTextoIdioma);
    botonEng.click(cambiarTextoIdioma);
});