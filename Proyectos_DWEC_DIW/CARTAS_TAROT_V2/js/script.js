//Creo la funcion aleatorio para cuando la necesite
function aleatorio() {
    arrayImagenes.sort(function () { return Math.random() - 0.5 });
    let contadorImg = 0;
    $(".carta").each(function () {
        $(this).data("imagen", arrayImagenes[contadorImg])
        contadorImg++;
    })
}

//Mantengo las cartas bloqueadas al inicio del juego hasta que se clica el botón
//que hace que comience el juego y haga lo que pide la dificultad.
$(".cartas").addClass("disabledbutton");
$(".btnAyuda").css("display", "none");

$("#btnComenzar").click(function () {
    let nivelDificultad = $("input:radio[name='radioDificultad']:checked").val();
    let nombre = $("#nombreForm").val();
    $("#nombre").html(nombre);
    $(".cartas").removeClass("disabledbutton");
    $(".comenzar").css("display", "none");
    $(".botonRestart").css("display", "block");
    aleatorio();

    //dificultad FACIL
    if(!nivelDificultad){
        nivelDificultad='radioMedio'
    }

    if (nivelDificultad == "radioFacil") {
        $(".btnAyuda").css("display", "block");

        console.log($(".carta").attr("src", $(this).data("imagen")));
        //se mostraran las cartas 2 segundos
        $(".btnAyuda").click(function () {
            $(".carta").each(function () {
                $(this).attr("src", $(this).data("imagen"))
            })
            //volvemos a darle la vuelta a las cartas tras 2 segundos
            setTimeout(() => {
                $(".carta").attr("src", "imagenes/vuelta.jpg");
            }, 2000);

        });
        //solo se puede usar una vez el boton
        $('.btnAyuda').on('click', function () {
            $(this).prop("disabled", true);
        });
    }

    //dificultad MEDIA
    if (nivelDificultad == "radioMedio") {
        $(".carta").each(function () {
            if ($(this).data("imagen") == "imagenes/bomba.jpg") {
                $(this).attr("src", "imagenes/bomba.jpg");
            }
        })
        //volvemos a darle la vuelta a las cartas tras 2 segundos
        setTimeout(() => {
            $(".carta").attr("src", "imagenes/vuelta.jpg");
        }, 2000);
    }

    //dificultad DIFICIL que ya está por defecto
    if (nivelDificultad == "radioDificil") {

    }
      //dificultad LEGENDA
      if (nivelDificultad == "radioLeyenda") {

    }
});
//boton volver a jugar
$(".botonRestart").click(function () {
    setTimeout(() => {
        location.reload();
    }, 400);
});


let puntuacion = 0;
let puntuacionError = 0;
let click1 = '';
let click2 = '';


let sonido = document.createElement("iframe");
let porcentajes = ["0", "18", "25", "40", "48", "60", "78", "100"];
const arrayImagenes = ["imagenes/diablo.jpg", "imagenes/enamorados.jpg", "imagenes/colgado.jpg", "imagenes/loco.jpg", "imagenes/mago.jpg",
    "imagenes/templanza.jpg", "imagenes/diablo.jpg", "imagenes/enamorados.jpg", "imagenes/colgado.jpg", "imagenes/loco.jpg",
    "imagenes/mago.jpg", "imagenes/templanza.jpg", "imagenes/torre.jpg", "imagenes/bomba.jpg", "imagenes/torre.jpg"];

let bomba = "imagenes/bomba.jpg";
//Top jugador
if (localStorage.getItem('ganador')) {
    let cookieJugadorGana = localStorage.getItem('ganador').split('?');
    let nombreCookieJugadorGana = cookieJugadorGana[0];
    let erroresCookieJugadorGana = cookieJugadorGana[1];

    $("#jugadorGana").html(nombreCookieJugadorGana);
    $("#errorJugadorGana").val(erroresCookieJugadorGana);
}

//doy sonido al giro de las cartas
$(".carta").click(function musica() {
    $(sonido).attr("src", "audio/carta.mp3");
    document.body.appendChild(sonido).style.display = "none";
});

//comparo las imagenes
$(".carta").click(comparar);
function comparar(e) {
    if ($(e.target).data("imagen") == "imagenes/bomba.jpg") {

        setTimeout(() => {
            $(sonido).attr("src", "audio/bomba.mp3");
            document.body.appendChild(sonido).style.display = "none";
            $(".carta").attr("src", "imagenes/vuelta.jpg");
            $(".carta").removeClass("sombra");
            puntuacion=0;
            $("#puntos").val(puntuacion);
            $("#bar").css("width", porcentajes[puntuacion] + "%");
            aleatorio();
        }, 700);
    }
    if (click1 == '') {
        click1 = e.target;
        $(click1).fadeOut();
        $(click1).fadeIn(10);
        $(click1).attr("src", $(click1).data("imagen"))
    } else {
        click2 = e.target;
        $(click2).fadeOut();
        $(click2).fadeIn(10);
        $(click2).attr("src", $(click2).data("imagen"))

        if ($(click1).attr("src") == $(click2).attr("src")) {
            setTimeout(() => {
                $(sonido).attr("src", "audio/acierto.mp3");
                document.body.appendChild(sonido).style.display = "none";
            }, 700);

            $(".alert").removeClass("alert-danger");
            $(".alert").removeClass("alert-dark");
            $(".alert").addClass("alert-success");


            let barraInformativa = "Has acertado!!";
            $("#barraInformativa").html(barraInformativa);
            puntuacion++;
            $("#puntos").val(puntuacion);
            $("#bar").css("width", porcentajes[puntuacion] + "%");
            click1.classList.add("sombra");
            click2.classList.add("sombra");
            click1 = '';
            click2 = '';
        } else {
            setTimeout(() => {
                let sonido = document.createElement("iframe");
                $(sonido).attr("src", "audio/error.mp3");
                document.body.appendChild(sonido).style.display = "none";


                $(".alert").removeClass("alert-dark");
                $(".alert").removeClass("alert-success");
                $(".alert").addClass("alert-danger");


                let barraInformativa = "Intentalo de nuevo";
                $("#barraInformativa").html(barraInformativa);
                click1.src = "imagenes/vuelta.jpg";
                click2.src = "imagenes/vuelta.jpg";
                puntuacionError++;
                $("#puntosError").val(puntuacionError);
                click1 = '';
                click2 = '';
            }, 700);
        }
    }
    if ($("#puntos").val() == 7) {
        setTimeout(() => {
            nombre = $("#nombre").html() + '?' + puntuacionError;
            if (localStorage.getItem('ganador')) {
                compararCookie();
            } else {
                localStorage.setItem('ganador', nombre);
            }
            alert("Has ganado!! Pero con un total de " + puntuacionError + " fallos :(");
            location.reload();
        }, 700);
    }
};

//si la página se carga con una cookie guardada usa la función
if (localStorage.getItem('lenguaje') == 'español') {
    cambiarIdiomaEs();
}
if (localStorage.getItem('lenguaje') == 'ingles') {
    cambiarIdiomaEn();
}
//Cambiar idioma
$("#cambiaContenidoEs").click(cambiarIdiomaEs);
$("#cambiaContenidoEn").click(cambiarIdiomaEn);

function cambiarIdiomaEn() {
    $.getJSON("idiomas/lang.json", function (respuesta) {
    let idioma= respuesta['lang']['EN'];
    $("#cambio0").html(idioma["TITULO"]);
    $("#cambio1").html(idioma["SCORE"]);
    $("#cambio2").html(idioma["ERRORS"]);
    $("#cambio3").html(idioma["TOPP"]);
    $("#cambio4").html(idioma["TOPERROR"]);
    $("#cambio5").html(idioma["LANGUAJE"]);
    $("#barraInformativa").html(idioma["INFO"]);
    $("#cambio7").html(idioma["DESCRI"]);
    $("#cambio8").html(idioma["PLAY"]);
    $("#cambio9").html(idioma["RESTART"]);
    $("#cambio10").html(idioma["GAME"]);
    $("#cambio11").html(idioma["INFORMACION"]);
    $("#cambio12").html(idioma["HELP"]);
    $("#cambio13").html(idioma["INFOJUEGO"]);
    $("#cambio14").html(idioma["INFOBOMBA"]);
    $("#cambio15").html(idioma["DIFICULTADES"]);
    localStorage.setItem('lenguaje', 'ingles');
})

}

function cambiarIdiomaEs() {
    $.getJSON("idiomas/lang.json", function (respuesta) {
        let idioma= respuesta['lang']['ES'];
        $("#cambio0").html(idioma["TITULO"]);
        $("#cambio1").html(idioma["SCORE"]);
        $("#cambio2").html(idioma["ERRORS"]);
        $("#cambio3").html(idioma["TOPP"]);
        $("#cambio4").html(idioma["TOPERROR"]);
        $("#cambio5").html(idioma["LANGUAJE"]);
        $("#barraInformativa").html(idioma["INFO"]);
        $("#cambio7").html(idioma["DESCRI"]);
        $("#cambio8").html(idioma["PLAY"]);
        $("#cambio9").html(idioma["RESTART"]);
        $("#cambio10").html(idioma["GAME"]);
        $("#cambio11").html(idioma["INFORMACION"]);
        $("#cambio12").html(idioma["HELP"]);
        $("#cambio13").html(idioma["INFOJUEGO"]);
        $("#cambio14").html(idioma["INFOBOMBA"]);
        $("#cambio15").html(idioma["DIFICULTADES"]);
    localStorage.setItem('lenguaje', 'español');
})
}

//ranking
function compararCookie() {
    let cookieJugadorGana = localStorage.getItem('ganador').split('?');
    let nombreCookieJugadorGana = cookieJugadorGana[0];
    let erroresCookieJugadorGana = cookieJugadorGana[1];

    if (puntuacionError >= erroresCookieJugadorGana) {
        return null;
    } else {
        localStorage.setItem('ganador', nombre);
    }
}




