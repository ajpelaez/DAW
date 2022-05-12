let contadorClicks = 0;
const cont = document.getElementById("contador");
const errores = document.getElementById("errores");
let cartasSeleccionadas = new Array();
const cartas = document.querySelectorAll(".carta");
const imagen;
let win, matchmsg, errormsg;

const opciones = ["bart", "lisa", "bart", "maggie", "maggie", "homer", "flanders", "lisa", "flanders", "marge", "marge", "homer"];
//crear funcion init que al cargar el doc carge el xml y el idioma segun la cookie
//creamos el array de cartas
const arrayOpciones = opciones.sort(function () { return Math.random() - 0.5 });

window.onload = function init() {

    if (localStorage.getItem("idioma") != null) {
        cambiarIdiomaJSON(localStorage.getItem("idioma"));
        
    } else {
        cambiarIdiomaJSON("esp");
    }
}

for (let i = 0; i < arrayOpciones.length; i++) {
    cartas[i].setAttribute("name", arrayOpciones[i]);
}
//DATOS USUARIO
let usuario;
do {
    usuario = prompt("Introduce tu nombre de usuario",)
} while (usuario === "" || usuario == null)
    document.getElementById("usuario").innerHTML = usuario;

//Top player
const filaError = document.getElementById("jugadorTopFilaError")
const jugadorTop = document.getElementById("jugadorTop")

if (localStorage.getItem("errores") != null && localStorage.getItem("usuario") != null) {
    filaError.innerHTML = localStorage.getItem("errores")
    jugadorTop.innerHTML = localStorage.getItem("usuario")
} else{
    aux = localStorage.setItem("errores", 100);
}


//añade a cada div carta el evento
for (carta of cartas) {
    carta.addEventListener("click", mostrarImagenes);
}

function mostrarImagenes(evt) {
    contadorClicks++;
    const carta = evt.target;
    console.log(carta);
    if (carta != null) {
        const idCarta = carta.getAttribute("name");
        cartasSeleccionadas.push(carta);
        imagen = document.createElement("img");
        carta.firstElementChild.appendChild(imagen).setAttribute("src", "img/" + idCarta + ".png");
        imagen.setAttribute("alt", idCarta);
        carta.classList.add("cara-delantera");
        carta.removeEventListener("click", mostrarImagenes);
        if (contadorClicks == 2) {
            contadorClicks = 0;
            setTimeout(() => {
                deseleccionar(cartasSeleccionadas);
            }, 500);


        }
    }
}

function deseleccionar(cartas) {
    if (comprobarIguales(cartas)) {
        cartas.forEach(element => {
            element.removeEventListener("click", mostrarImagenes);
        });

    } else {
        cartas.forEach(element => {
            element.firstElementChild.removeChild(element.firstElementChild.lastElementChild);
            element.addEventListener("click", mostrarImagenes);
            element.classList.remove("cara-delantera");
        });
    };

    cartasSeleccionadas = [];
}

const barraInformativa = document.getElementById("barra_informativa");

function comprobarIguales(arraySeleccionados) {
    if (arraySeleccionados[0].getAttribute("name") == arraySeleccionados[1].getAttribute("name")) {
        arraySeleccionados.forEach(element => {
            element.classList.add("correcta");
            barraInformativa.innerHTML = matchmsg;
        });

        checkTotal()

        return true;
    } else {
        barraInformativa.innerHTML = errormsg;
        sumarErrores();
        return false
    }
}

function checkTotal() {
    contParsed = parseInt(cont.textContent, 10)
    contParsed++
    cont.innerHTML = contParsed;
    if (contParsed == 6) {
        guardarPuntuacionFinal(this.usuario, errores.textContent);
        alert(win)
        window.location.reload();
    }
}

function sumarErrores() {
    errorParsed = parseInt(errores.textContent, 10)
    errorParsed++
    errores.innerHTML = errorParsed;
}

function guardarPuntuacionFinal(usuario, errores) {
    let aux = localStorage.getItem("errores")

    if (aux != null && errores < aux) {
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("errores", errores);
        
    } 
}

//Idioma
const btnsIdiomas = document.getElementsByClassName("idioma");
Array.from(btnsIdiomas).forEach(element => {
    element.addEventListener("click", cambiaIdioma);
});

function cambiaIdioma(evt) {
    let idiomaClick = evt.target.id;
    if (localStorage.getItem("idioma") == idiomaClick) {
        return;
    } else {
        if (idiomaClick == "eng") {
            localStorage.setItem("idioma", "eng");
            cambiarIdiomaJSON("eng");
            evt.target.style.fontWeight = "bold";
            document.getElementById("esp").style.fontWeight = "normal";
        } else {
            localStorage.setItem("idioma", "esp");
            cambiarIdiomaJSON("esp");
            evt.target.style.fontWeight = "bold";
            document.getElementById("eng").style.fontWeight = "normal";
        }
    }
}

function cambiarIdiomaJSON(idioma){
    const xmlhttp = new XMLHttpRequest();
    const url = "lang.json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const myArr = JSON.parse(this.responseText);
            cambiaTexto(myArr, idioma);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function cambiaTexto(arr, idioma) {
            const lenguaje = arr["lang"][idioma];

            document.getElementById("estadisticas").innerHTML = lenguaje.STADISTICS;

            document.getElementById("barra_informativa").innerHTML = lenguaje.INFOBAR;

            document.getElementById("tagPuntuacion").innerHTML = lenguaje.SCORE;

            document.getElementById("tagErrores").innerHTML = lenguaje.ERRORS;

            document.getElementById("tagErroresTop").innerHTML = lenguaje.ERRORS;

            document.getElementById("tagTop").innerHTML = lenguaje.TOPPLAYER;

            matchmsg = lenguaje.MATCHMESSAGE

            errormsg = lenguaje.ERRORMESSAGE

            document.getElementById("tagDesc").innerHTML = lenguaje.DESC;

            win = lenguaje.WIN;

            document.getElementById("tagDescCompleta").innerHTML = lenguaje.DESCRIPTION;

            document.getElementById("leng").innerHTML = idioma;
    }
    
}




