/******************************/
/***PARAMETROS PARA EL JUEGO*****/
var oJuego = new Object(); //instanciamos un nuevo objeto
oJuego.columnas = 4; //establecemos el nÃºmero de columnas que tendrÃ¡ el tablero
oJuego.filas = 3; //establecermos el nÃºmero de filas que tendrÃ¡ el tablero
oJuego.extension = ".png"; //extensiÃ³n para TODAS las imagenes
oJuego.ruta = "img/"; //directorio dÃ³nde seguardan las imagenes
oJuego.pulsada = new Array(0, 0); //array para guardar las parejas de cartas al pulsar
oJuego.intentos = 0; //contador de intentos
oJuego.aciertos = 0; //contador de aciertos
let nombreUsuario = prompt("Introduce tu nombre de usuario");
let barra_informativa = document.getElementById("mensaje");

var MAXIMO_FICHAS = oJuego.filas * oJuego.columnas; //el mÃ¡ximo de fichas para el tablero
const aImagenes = new Array(); //array para guardar las imagenes
var enPausa = false; //pause para esperar a pulsar la segunda carta
/********************************/

/************FUNCIONES***********/
//FunciÃ³n para cargar todas las imagenes. Le damos un tamaÃ±o de 100x100
//Guardamos cada imagen dentro del array para guardar las imagenes
function cargarImagenes() {
    for (i = 0; i < MAXIMO_FICHAS; i++) {
        aImagenes[i] = new Image(100, 100);
        aImagenes[i].src = oJuego.ruta + i + oJuego.extension;
    }

}

/*********************************/

//functiÃ³n para pintar en la pÃ¡gina el tablero
//por defecto se muestra en todas la celdas la imagen llamada cruz.png
//se guardan todos los elementos de la tabla dentro de la variable salida
//que se muestra al final de la funciÃ³n.
function mostrarTablero() {

    //mostramos los contadores
    document.getElementById("movimientos").innerHTML = oJuego.intentos;
    document.getElementById("aciertos").innerHTML = oJuego.aciertos;
    document.getElementById("nombre").innerHTML = nombreUsuario;

    var salida = "<table>\n";

    for (i = 0; i < MAXIMO_FICHAS; i++) {
        if (i % oJuego.columnas == 0) {
            salida += "\n<tr>"
        }
        salida += '<td id="carta_' + i + '">' +
            '<img class="cartaza" src="' + oJuego.ruta + "cruz" + oJuego.extension + '" alt="' + i + '"></td>';
    }
    salida += "</table>";

    document.getElementById("tablero").innerHTML = salida;
}

/*********************************/

//functiÃ³n para empezar y establecer los parÃ¡metros antes de mostrar el tablero
function empezarJuego() {
    var nUno, nDos, nTemp;
    oJuego.pulsada = new Array(-1, -1); //iniciamos en -1 para solo poder usar las posiciones 1 y 0
    oJuego.intentos = 0;
    oJuego.aciertos = 0;

    // ordenar array ()
    oJuego.cartas = new Array(MAXIMO_FICHAS)
    for (i = 0; i < MAXIMO_FICHAS; i++) {
        oJuego.cartas[i] = i;
    }

    // desordenar el array()
    i = 100;
    while (i--) {
        nUno = azar(); //aleatorio para separar las parejas
        nDos = azar(); //aleatorio para separar la pareja de la anterior
        if (nDos != nUno) { //establecemos el orden
            nTemp = oJuego.cartas[nUno]
            oJuego.cartas[nUno] = oJuego.cartas[nDos]
            oJuego.cartas[nDos] = nTemp;
        }
    }

    mostrarTablero(); //mostramos el tablero gracias a la funciÃ³n mostrarTablero
}

/*********************************/

// funciones varias para el juego
function azar() {
    return Math.floor(Math.random() * MAXIMO_FICHAS);
}

/*********************************/

//función para comprobar si se han pulsado una o dos cartas
function soloImpar(n) {
    return (n % 2 == 0 ? n : n - 1);
}

/*********************************/

//función para mostrar cada una de las imagenes
function mostrar(nFicha) {
    if (!enPausa) {
        //buscamos la imagen en el array
        if (document.images[nFicha].src.indexOf(oJuego.ruta + "cruz" + oJuego.extension) != -1) {
            document.images[nFicha].src = aImagenes[oJuego.cartas[nFicha]].src;
            if (oJuego.pulsada[0] == -1) {
                oJuego.pulsada[0] = nFicha;
            }
            else {
                oJuego.pulsada[1] = nFicha;
            }
        } else {
            //en caso de que se pulse una imagen ya girada	
            alert("¡¡Exclusiva!!. Tienes que seleccionar otra carta ... !!");
        }
    }
}

/*********************************/

//función para volver a dar la vuelta a las cartas
function quitarPausa() {
    enPausa = false;
    document.images[oJuego.pulsada[0]].src = oJuego.ruta + "cruz" + oJuego.extension;
    document.images[oJuego.pulsada[1]].src = oJuego.ruta + "cruz" + oJuego.extension;

    // volver las teclas 
    oJuego.pulsada[0] = -1;
    oJuego.pulsada[1] = -1;
}

/*********************************/

function comprobar() {
    document.getElementById("mensaje").innerHTML = "";
    // comprobar dos teclas	
    if (enPausa || oJuego.pulsada[1] == -1) {
        return;
    }
    oJuego.intentos++; //aÃ±adimos uno al contador

    //en caso de acertar 
    if (soloImpar(oJuego.cartas[oJuego.pulsada[0]]) == soloImpar(oJuego.cartas[oJuego.pulsada[1]])) {

        ////////////////Si las cartas coinciden les aplicamos el estilo de la clase cartasAcertadas
        document.images[oJuego.pulsada[0]].className = "cartasAcertadas";
        document.images[oJuego.pulsada[1]].className = "cartasAcertadas";

        ////////Mostramos el mensaje de acierto/////////////////////////
        barraInformativaTexto("message_success");
        oJuego.aciertos++; //añadimos uno al contador aciertos

        if (oJuego.aciertos == 3) {
            document.getElementById("mensaje").innerHTML = "¡¿Dónde están los tíos?!¡Los tíos!";
        }
        if (oJuego.aciertos * 2 == MAXIMO_FICHAS) {
            //mensaje de final de juego
            barraInformativaTexto("message_victory");
            alert("Qué noshe hijo, que noshe ... y solo lo has tenido que intentar " + oJuego.intentos + " veces\nComo premio has conseguido un puesto de becario!!!");
            ///////Guardamos en localStorage los intentos y el nombre del mejor jugador
            if (localStorage.ranking == null || localStorage.ranking > oJuego.intentos) {
                localStorage.setItem("ranking", oJuego.intentos);
                localStorage.setItem("jugador", nombreUsuario);
            }
        }

        oJuego.pulsada[0] = -1;
        oJuego.pulsada[1] = -1;
    } else {
        enPausa = true; //activamos pause
        barraInformativaTexto("message_mistake");//En caso de fallar muestra este mensaje
        setTimeout(quitarPausa, 1000); //establecemos el pause en 1 segundo para darse la vuelta las imagenes cuando no coincidan
    }

    //mostramos los contadores
    document.getElementById("movimientos").innerHTML = oJuego.intentos;
    document.getElementById("aciertos").innerHTML = oJuego.aciertos;
}

/*********************************/
function cambiarTextoIdioma(e) {
    // Guarda en el web storage el idioma
    localStorage.setItem("idioma", e.target.textContent);
    loadLanguage();
}

//Evento que al cargarse la ventana carga las funciones cargarImagenes, empezarJuego y cargar el reloj
window.onload = function () {
    cargarImagenes();
    empezarJuego();
    bienvenida();

    ////////////////////////Introducimos el mejor jugador al ranking///////////////////////////////
    document.getElementById("jugador").innerHTML = localStorage.jugador;
    document.getElementById("fallos").innerHTML = localStorage.ranking;

    //////////////////////Cargamos el lenguaje///////////////////////////////////
    loadLanguage();

    ////////////////////Añadimos los listener//////////////////////////////////////
    document.getElementById('esp').addEventListener("click", cambiarTextoIdioma);
    document.getElementById('ing').addEventListener("click", cambiarTextoIdioma);
    for (let i = 0; i < 12; i++) {
        document.getElementsByClassName("cartaza")[i].addEventListener("mousedown", () => mostrar(i));
        document.getElementsByClassName("cartaza")[i].addEventListener("mouseup", comprobar);
    }
    //////////////////////////////////////////////////////////////////////////////
}

/***************************************/
//Función de bienvenida
function bienvenida() {
    alert("Bienvenid@ a las ChirinCartas\nBusca las parejas de los tertulianos del Chiringuito\n y gánate un puesto de becario.\n¡Pero qué locura es esta!");
}


