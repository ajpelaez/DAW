let contadorClicks = 0;
let contParsed = 0;
let errorParsed = 0;
let cont = $("#contador");
let errores = $("#errores");
let cartasSeleccionadas = new Array();
const cartas = $(".carta");
let contadorClickAyuda = 0;
let etiquetaUsuario = $("#usuario");
let imagen;
let matchMessage;
let errorMessage;
let win;
let errors;
let usuario;
let dificultades;
let ranking = [
    { "nombre": "Jugador 1", "errores": 10 },
    { "nombre": "Jugador 2", "errores": 20 },
    { "nombre": "Jugador 3", "errores": 40 },
    { "nombre": "Jugador 4", "errores": 60 },
    { "nombre": "Jugador 5", "errores": 80 }
];

let rankingMasFallos = [
    { "nombre": "Jugador 1", "errores": 90 },
    { "nombre": "Jugador 2", "errores": 110 }
];
window.onload = init();
//creamos el array de cartas

//ponemos el idioma, si ya hay almacenado uno, sino por defecto español
function init() {
    if (localStorage.getItem("idioma") != null) {
        cargarDocumentoJSONJQuery(localStorage.getItem("idioma"));
    } else {
        cargarDocumentoJSONJQuery("esp");
    }
    $(cartas).hide();

    $("#empezarJuego").on("click", function () {
        iniciarJuego();
        rankingJugadores();
        rankingJugadoresMasFallos();
        $("#btnCerrarModal").trigger("click", () => {
            $(".modal").hide();
        })
    })

}

function iniciarJuego() {
    usuario = $("#nombreUsuario").val();
    if (usuario) {
        if ($("input[name='flexRadioDefault']:radio").is(':checked')) {
            etiquetaUsuario.html(`<i class="fa-solid fa-user-astronaut"></i>${usuario}`);
            if (!$(cartas).is(":visible")) {
                $(cartas).show();
                $(cartas).effect("slide", "slow");
            }
            $(".carta").off();
            dificultades = $("input[name='flexRadioDefault']:radio").filter(':checked').val();
            barajar();
            cartas.each(function () {
                $(this).children().first().empty()
                //prodiamos crear una clase con dos estilos (inicial, acertada) y quitar o darla a los elementos
                $(this).removeClass("correcta")
                $(this).css("background-image", "url(img/cara-trasera2.jpg)");
                $(this).css("background-color", "")
                $(this).css("border", "none")
            });
            $(".inicio")[0].play();
            cartasSeleccionadas = [];
            contadorClicks = 0;
            contadorClickAyuda = 0;
            contParsed = 0;
            errorParsed = 0;
            cont.html(contParsed);
            errores.html(errorParsed);
            $(".progress-bar").css("width", "0%");
            $(".progress-bar").attr("aria-valuenow", 0);
            dificultad(dificultades);
        } else {
            alert("Selecciona una dificultad")
        }
    } else {
        alert("Escribe tu nombre de jugador")
    }
}
//Top player
/*let filaError = document.getElementById("jugadorTopFilaError")
let jugadorTop = document.getElementById("jugadorTop")

if (localStorage.getItem("errores") != null && localStorage.getItem("usuario") != null) {
    filaError.innerHTML = localStorage.getItem("errores")
    jugadorTop.innerHTML = localStorage.getItem("usuario")
}*/


//añade a cada div carta el evento

// carta.addEventListener("click", mostrarImagenes);


function mostrarImagenes(evt) {
    contadorClicks++;
    const carta = evt.target;
    if (carta != null) {
        /*let carta = contenidoCarta.parentElement;*/
        //const idCarta = $(carta).attr("name");
        const idCarta = $(carta).data("name");
        cartasSeleccionadas.push(carta);
        imagen = document.createElement("img")
        $(imagen).attr("src", "img/" + idCarta + ".png");
        //corregir, se agrega debajo del div de carta__imagen
        $(carta).children(".carta__imagen").html(imagen);
        $(imagen).attr("alt", idCarta);
        $(carta).css("background-color", "white");
        $(carta).css("background-image", "url('')");
        $(carta).css("border", "1px solid black");
        $(carta).off(evt);
        $(".sonic-ring")[0].play();

        if (contadorClicks == 2) {
            contadorClicks = 0;
            $("#div-ayuda").css("display", "block")
            setTimeout(() => {
                
                deseleccionar(cartasSeleccionadas);
                $("#div-ayuda").css("display", "none")
            }, 500);


        }

        if (idCarta == "bomba") {
            setTimeout(() => {
                cartaBomba();
            }, 1000);
            cartasSeleccionadas.splice(0, cartasSeleccionadas.length)
            barajar();
            evt.preventDefault();

        }
    }

}

function barajar() {
    $(".carta").off()
    if ($(cartas).attr("name") !== undefined) {
        for (let i = 0; i < cartas.length; i++) {
            cartas[i].removeData("name")
        }
    }
    cartasSeleccionadas = [];
    const opciones = ["bart", "marge", "lisa", "bart", "maggie", "apu", "homer", "bomba", "flanders", "lisa", "maggie", "marge", "homer", "flanders", "apu"];
    const arrayOpciones = opciones.sort(function () { return Math.random() - 0.5 });
    for (let i = 0; i < arrayOpciones.length; i++) {
        //cartas[i].setAttribute("name", arrayOpciones[i]);
        $(cartas[i]).data("name", arrayOpciones[i]);
    }
    contadorClicks = 0;
    $(".carta").click(mostrarImagenes)
}

function cartaBomba() {
    cont.innerHTML = "0";
    contadorClicks = 0;
    $(cartas).each(function () {
        $(this).children().first().empty()
        $(this).off("click", mostrarImagenes);
        $(this).on("click", mostrarImagenes)
        $(this).removeAttr("style")
    });
    $(".explosion")[0].play();
    $(".alert").removeClass("alert-primary");
    $(".alert").removeClass("alert-success");
    $(".alert").addClass("alert-danger");
    $(".progress-bar").css("width", "0%");
    $(".progress-bar").attr("aria-valuenow", "0");
    $("#barra_informativa").html("BOOOOOOOOOOOOOOM!");
}

function deseleccionar(cartas) {
    if (comprobarIguales(cartas)) {
        cartas.forEach(element => {
            $(element).off(mostrarImagenes)
        });

    } else {
        
        cartas.forEach(element => {
            $(element).children().first().empty()
            $(element).on("click", mostrarImagenes);
            //prodiamos crear una clase con dos estilos (inicial, acertada) y quitar o darla a los elementos
            $(element).css("background-image", "url(img/cara-trasera2.jpg)");
            $(element).css("background-color", "")
            $(element).css("border", "")
            $(element).effect("shake", "fast")
        });
        erroresModoLeyenda(dificultades)
    };
    contadorClicks = 0;
    cartasSeleccionadas = [];

}

function comprobarIguales(arraySeleccionados) {
    if (arraySeleccionados[0] !== undefined || arraySeleccionados[1] !== undefined) {
        if ($(arraySeleccionados[0]).data("name") == $(arraySeleccionados[1]).data("name")) {
            arraySeleccionados.forEach(element => {
                $(element).css("border", "3px solid green")
                $(element).addClass("correcta");
                if (matchMessage != "") {
                    $(".alert").removeClass("alert-primary");
                    $(".alert").removeClass("alert-danger");
                    $(".alert").addClass("alert-success");
                    $("#barra_informativa").html(matchMessage);
                }
            });
            $(".correcto")[0].play();
            contParsed = parseInt(cont.html(), 10)
            ++contParsed
            checkTotal(contParsed)
            return true;
        } else {
            $(".alert").removeClass("alert-primary");
            $(".alert").removeClass("alert-success");
            $(".alert").addClass("alert-danger");
            $("#barra_informativa").html(errorMessage);
            $(".incorrecto")[0].play();
            sumarErrores();
            return false
        }
    }


}

function checkTotal(cp) {

    switch (cp) {
        case 1:
            $(".progress-bar").css("width", "14.28%");
            $(".progress-bar").attr("aria-valuenow", cp);
            break;
        case 2:
            $(".progress-bar").css("width", "28.56%");
            $(".progress-bar").attr("aria-valuenow", cp);
            break;
        case 3:
            $(".progress-bar").css("width", "42.84%");
            $(".progress-bar").attr("aria-valuenow", cp);
            break;
        case 4:
            $(".progress-bar").css("width", "57.12%");
            $(".progress-bar").attr("aria-valuenow", cp);
            break;
        case 5:
            $(".progress-bar").css("width", "71.4%");
            $(".progress-bar").attr("aria-valuenow", cp);
            break;
        case 6:
            $(".progress-bar").css("width", "85.68%");
            $(".progress-bar").attr("aria-valuenow", cp);
            break;
        case 7:
            $(".progress-bar").css("width", "100%");
            $(".progress-bar").attr("aria-valuenow", cp);
            break;
        default:
            $(".progress-bar").css("width", "0%");
            $(".progress-bar").attr("aria-valuenow", "0");
            break;
    }

    cont.html(cp);


    if (contParsed == 7) {
        //guardarPuntuacionFinal(this.usuario, errores.textContent);
        rankingJugadores();
        rankingJugadoresMasFallos();
        alert(`${win}, ${errores.html()} ${errors}`)
        window.location.reload();
    }
}

function erroresModoLeyenda(d) {
    if (d == "leyenda") {
        errorParsed = parseInt(errores.html(), 10)
        if (errorParsed == 3) {
            alert(`Perdiste`);
            window.location.reload();
        }
        errorParsed++;
    }
}

function sumarErrores() {
    errorParsed = parseInt(errores.html(), 10)
    errorParsed++
    console.log(errorParsed)
    errores.html(errorParsed);
}
function guardarPuntuacionFinal(usuario, errores) {
    let aux = localStorage.getItem("errores")


    if (aux == null) {
        aux = localStorage.setItem("errores", 100)
    }

    if (errores < aux) {
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("errores", Math.min(localStorage.getItem("errores"), errores));
    }
}


/* COOKIES */
function setCookie(nombreCookie, valorCookie, expiraDia = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (expiraDia * 24 * 60 * 60 * 1000))
    let expiracion = `expira=${date.toUTCString()}`;
    document.cookie = `${nombreCookie}=${valorCookie}; ${expiracion};`;
}

function getCookie(nombreCookie) {
    let nombre = nombreCookie + "=";
    let arrayCookie = document.cookie.split(";");
    for (let i = 0; i < arrayCookie.length; i++) {
        let cookie = arrayCookie[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nombre) == 0) {
            return cookie.substring(nombre.length, cookie.length);
        }
    }
    return "";
}

//Idioma
let btnsIdiomas = document.getElementsByClassName("idioma");
Array.from(btnsIdiomas).forEach(element => {
    $(element).on("click", cambiaIdioma);
});

function cambiaIdioma(evt) {
    let idiomaClick = evt.target.id;
    if (localStorage.getItem("idioma") == idiomaClick) {
        return;
    } else {
        if (idiomaClick == "eng") {
            localStorage.setItem("idioma", "eng");
            /**cargarDocumentoXML(idiomaClick);
            cargarDocumentoTXT(idiomaClick)*/
            /*cargarDocumentoJSON(idiomaClick)*/
            cargarDocumentoJSONJQuery(idiomaClick)
            evt.target.style.fontWeight = "bold";
            $("#esp").css("font-weight", "bold");
        } else {
            localStorage.setItem("idioma", "esp");
            /* cargarDocumentoXML(idiomaClick);
             cargarDocumentoTXT(idiomaClick)*/
            /*cargarDocumentoJSON(idiomaClick)*/
            cargarDocumentoJSONJQuery(idiomaClick);
            evt.target.style.fontWeight = "bold";
            $("#eng").css("font-weight", "bold");
        }
    }
}
/*function cambiaTexto(json, idioma) {

    let lenguaje;

    if (idioma == "esp") {
        lenguaje = "esp"
    } else {
        lenguaje = "eng"
    }

    $("#tagPuntuacion").html(json.lang[lenguaje].score)
    $("#tagErrores").html(json.lang[lenguaje].errors)
    $("#tagJugadorTop").html(json.lang[lenguaje].topPlayer)
    $("#tagErroresTop").html(json.lang[lenguaje].errors)
    $(".aside__lateral > #titulo_aside").html(json.lang[lenguaje].titleDescription)
    $(".aside__lateral > p").html(json.lang[lenguaje].gameDescription)

    win = json.lang[lenguaje].win
    matchMessage = json.lang[lenguaje].matchMessage
    errorMessage = json.lang[lenguaje].errorMessage
    errors = json.lang[lenguaje].errors
    if(xml != ""){
        let xmlDoc = xml.responseXML;
        let lenguaje = xmlDoc.getElementsByTagName(idioma);
        let valores = new Array();
        for (let i = 0; i < lenguaje.length; i++) {
            valores = Array.from(lenguaje[i].children);
        }
    
        
            document.getElementById("tagPuntuacion").innerHTML = valores[0].textContent;
            document.getElementById("tagErrores").innerHTML = valores[1].textContent;
            document.getElementById("tagJugadorTop").innerHTML = valores[2].textContent;
            document.getElementById("tagErroresTop").innerHTML = valores[1].textContent;
            document.querySelector(".aside__lateral > #titulo_aside").innerHTML = valores[6].textContent;
            
            win = valores[5].textContent;
            matchMessage = valores[3].textContent;
            errorMessage = valores[4].textContent;
            errors = valores[1].textContent;
        
    }
 if (idioma == "eng") {
         document.getElementById("tagPuntuacion").innerHTML = "Score";
         document.getElementById("tagErrores").innerHTML = "Errors";
         document.getElementById("tagErroresTop").innerHTML = "Errors";
         document.getElementById("leng").innerHTML = "Language";
     } else {
         document.getElementById("tagPuntuacion").innerHTML = "Puntuacion";
         document.getElementById("tagErrores").innerHTML = "Errores";
         document.getElementById("tagErroresTop").innerHTML = "Errores";
         document.getElementById("leng").innerHTML = "Lenguaje";
     }
}*/

/*function cargarDocumentoXML(idioma) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cambiaTexto(this, idioma);
        }
    };
    xhttp.open("GET", "idioma.xml", true);
    xhttp.send();
}*/

/*function cargarDocumentoTXT(idioma) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.querySelector(".aside__lateral > p").innerHTML = this.responseText;
        }
    };
    if (idioma == "esp") {
        xhttp.open("GET", "descripcion_es.txt", true);
    } else {
        xhttp.open("GET", "descripcion_en.txt", true);
    }
    xhttp.send();
}*/

/*function cargarDocumentoJSON(idioma) {
    let xhttp = new XMLHttpRequest();
    let url = "lang.txt"
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            cambiaTexto(json, idioma);
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
}*/

function cargarDocumentoJSONJQuery(idioma) {

    let url = "lang.json"

    $.getJSON(url, function () {

    })
        .done(function (json) {
            let lenguaje;

            if (idioma == "esp") {
                lenguaje = "esp"
            } else {
                lenguaje = "eng"
            }
            $("#tagPuntuacion").html(json.lang[lenguaje].score)
            $("#tagErrores").html(json.lang[lenguaje].errors)
            $("#tagJugadorTop").html(json.lang[lenguaje].topPlayer)
            $("#tagErroresTop").html(json.lang[lenguaje].errors)
            $(".aside__lateral > #titulo_aside").html(json.lang[lenguaje].titleDescription)
            $(".aside__lateral > p").html(json.lang[lenguaje].gameDescription)

            win = json.lang[lenguaje].win
            matchMessage = json.lang[lenguaje].matchMessage
            errorMessage = json.lang[lenguaje].errorMessage
            errors = json.lang[lenguaje].errors
        })
}

/* MODAL */
$("#btnCerrarModal").on("click", () => {
    $(".modal").hide();
})


/* DIFICULTAD */

function dificultad(d) {

    switch (d) {
        case "facil":
            $("#ayuda").css("display", "inline-block")
            $("#ayuda").click(() => {
                if (contadorClickAyuda == 0) {
                    $(cartas).each(function () {
                        if(!$(this).hasClass("correcta")){
                            $(this).off();
                            imagen = document.createElement("img")
                            $(imagen).attr("src", "img/" + $(this).data("name") + ".png");
                            $(this).children(".carta__imagen").html(imagen);
                            $(imagen).attr("alt", $(this).data("name"));
                            $(this).css("background-color", "white");
                            $(this).css("background-image", "url('')");
                            $(this).css("border", "1px solid black");
                            contadorClicks = 0;
                            setTimeout(() => {
                                contadorClickAyuda = 1;
                                $(this).children().first().empty();
                                $(this).css("border", "none");
                                $(this).css("background-image", "url(img/cara-trasera2.jpg)")
                                $(this).on("click", mostrarImagenes);
                            }, 2000);
                        }
                    })
                    cartasSeleccionadas = [];
                    contadorClicks = 0;
                } else {
                    alert("Ya has usado la ayuda");
                }
            })
            break;
        case "normal":
            $("#ayuda").css("display", "none")
            $(cartas).each(function () {
                if ($(this).data("name") == "bomba") {
                    setTimeout(() => {
                        $(this).off();
                        imagen = document.createElement("img")
                        $(imagen).attr("src", "img/" + $(this).data("name") + ".png");
                        $(this).children(".carta__imagen").html(imagen);
                        $(imagen).attr("alt", $(this).data("name"));
                        $(this).css("background-color", "white");
                        $(this).css("background-image", "url('')");
                        $(this).css("border", "1px solid black");
                    }, 1000)
                    setTimeout(() => {
                        $(this).children().first().empty();
                        $(this).css("border", "none");
                        $(this).css("background-image", "url(img/cara-trasera2.jpg)")
                        $(this).on("click", mostrarImagenes);
                    }, 3000);
                }
            })
            cartasSeleccionadas = [];
            contadorClicks = 0;
            break;
        case "dificil":
            $("#ayuda").css("display", "none")
            break;
        case "leyenda":
            $("#ayuda").css("display", "none")
            $(cartas).each(function () {
                if ($(this).data("name") == "bomba") {
                    setTimeout(() => {
                        $(this).off();
                        imagen = document.createElement("img")
                        $(imagen).attr("src", "img/" + $(this).data("name") + ".png");
                        $(this).children(".carta__imagen").html(imagen);
                        $(imagen).attr("alt", $(this).data("name"));
                        $(this).css("background-color", "white");
                        $(this).css("background-image", "url('')");
                        $(this).css("border", "1px solid black");
                    }, 1000)
                    setTimeout(() => {
                        $(this).children().first().empty();
                        $(this).css("border", "none");
                        $(this).css("background-image", "url(img/cara-trasera2.jpg)")
                        $(this).on("click", mostrarImagenes);
                    }, 2000);
                }
            })
            cartasSeleccionadas = [];
            contadorClicks = 0;
            break;
    }
}

/** RANKING **/
function rankingJugadores() {
    let i = 1;
    let actualizar = false;
    if (localStorage.getItem('ranking') == null) {
        localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
        ranking = JSON.parse(localStorage.getItem("ranking"));
        if (contParsed == 7) {
            ranking.forEach(element => {
                if (errorParsed <= element.errores && actualizar == false) {
                    element.nombre = usuario
                    element.errores = errorParsed;
                    actualizar = true;
                }
            });
        }
        localStorage.setItem('ranking', JSON.stringify(ranking));
    }
    ranking.forEach(element => {
        $('#topNombre' + i).html(element.nombre);
        $('#topErrores' + i).html(element.errores);
        i++;
    });
}


function rankingJugadoresMasFallos() {
    let i = 1;
    let actualizar = false;
    if (localStorage.getItem('rankingMasFallos') == null) {
        localStorage.setItem('rankingMasFallos', JSON.stringify(rankingMasFallos));
    } else {
        rankingMasFallos = JSON.parse(localStorage.getItem("rankingMasFallos"));
        if (contParsed == 7) {
            rankingMasFallos.forEach(element => {
                if (errorParsed >= element.errores && actualizar == false) {
                    element.nombre = usuario
                    element.errores = errorParsed;
                    actualizar = true;
                }
            });
        }
        localStorage.setItem('rankingMasFallos', JSON.stringify(rankingMasFallos));
    }
    rankingMasFallos.forEach(element => {
        $('#topNombreMasFallos' + i).html(element.nombre);
        $('#topErroresMasFallos' + i).html(element.errores);
        i++;
    });
}