let contadorClicks = 0;
const contadorGanar = 7;
const cont = $("#contador");
const errores = $("#errores");
let cartasSeleccionadas = new Array();
const cartas = $(".carta");
let usuario;
const mostrarAyuda = $("#mostrar");
let imagen;
let win, matchmsg, errormsg, lose;
let audio = new Audio();
const opciones = ["bart", "abuelo", "lisa", "bart", "maggie", "bomba", "maggie", "homer", "flanders", "lisa", "flanders", "marge", "marge", "homer", "abuelo"];
const opciones2 = ["bart", "bart", "bart", "bart", "bart", "bart", "maggie", "homer", "flanders", "bart", "bart", "bart", "bart", "bart", "bart"];
const botonInicio = $("#botonInicio");

//Ranking
let ranking;

//Idioma
$(".idioma").on("click", cambiaIdioma);

const barraInformativa = $("#barra_informativa");

/****************************************************************************************************/
window.onload = function init() {

    //localStorage.setItem("ranking", JSON.stringify(ranking));
    //let prueba = JSON.parse(localStorage.getItem("ranking"));
    //console.log(prueba)

    if (localStorage.getItem("ranking") == null) {
        ranking = new Array();
        ranking[0] = { "jugador": "jugador1", "errores": 10 };
        ranking[1] = { "jugador": "jugador2", "errores": 20 };
        ranking[2] = { "jugador": "jugador3", "errores": 30 };
        ranking[3] = { "jugador": "jugador4", "errores": 40 };
        ranking[4] = { "jugador": "jugador5", "errores": 50 };
        localStorage.setItem("ranking", JSON.stringify(ranking));
    } else {
        ranking = JSON.parse(localStorage.getItem("ranking"));
    }
    $("#jugador1").html(ranking[0]["jugador"]);
    $("#jugador1FilaError").html(ranking[0]["errores"]);
    $("#jugador2").html(ranking[1]["jugador"]);
    $("#jugador2FilaError").html(ranking[1]["errores"]);
    $("#jugador3").html(ranking[2]["jugador"]);
    $("#jugador3FilaError").html(ranking[2]["errores"]);
    $("#jugador4").html(ranking[3]["jugador"]);
    $("#jugador4FilaError").html(ranking[3]["errores"]);
    $("#jugador5").html(ranking[4]["jugador"]);
    $("#jugador5FilaError").html(ranking[4]["errores"]);

    $(botonInicio).html('<i class="fas fa-play"></i>');


    if (localStorage.getItem("idioma") != null) {
        cambiarIdiomaJSON(localStorage.getItem("idioma"));

    } else {
        cambiarIdiomaJSON("esp");
    }

    $(".carta").addClass("prevent-click");
    $("#mostrar").addClass("prevent-click");
}

$("#comenzar").on("click", function () {
    if ($("#nick").val() == "") {
        return;
    }
    $('.progress-bar').css('width', '0%').attr('aria-valuenow', '0');
    usuario = $("#nick").val();
    $("#usuario").html(usuario);
    $(errores).html(0);
    $(cartas).removeClass("cara-delantera");
    $(cartas).removeClass("correcta");
    $(cartas).each(function (index, element) {
        $(element).children().first().empty();
    });
    if($("#infiltrado").is(":checked")){
        barajarInfiltrado();
        $(cartas).each(function (index, element) {
            $(element).addClass("prevent-click")
            $(element).addClass("cara-delantera");
            imagen = document.createElement("img");
            $(imagen).attr("src", "img/" + $(element).data("name") + ".png")
            $(element).children(".carta__imagen").html(imagen);
        });
        $(cartas).each(function (index, element) {
            setTimeout(() => {
                if (!$(element).hasClass("correcta")) {
                    $(element).removeClass("cara-delantera");
                    $(element).children().first().empty();
                    $(element).removeClass("prevent-click");
                }

            }, 2000);
        });
        $('input[name="dificultad"]').css("display", "none");
    }else{
        barajar();
        comprobarDificultad();
    }
    
    $(".modal").trigger("click", function () {
        $(this).modal('hide');
    });
    $("#mostrar").removeClass("prevent-click");
    
    $(".carta").effect("bounce", { direction: 'down', times: 2 }, "slow");


});

function barajar() {
    $(cartas).off("click");

    if ($(cartas).data("name") != null) {
        $(cartas).removeData("name");
    }
    const arrayOpciones = opciones.sort(function () { return Math.random() - 0.5 });
    for (let i = 0; i < arrayOpciones.length; i++) {
        $(cartas[i]).data("name", arrayOpciones[i]);
        console.log($(cartas[i]).data("name"));

    }

    $(".carta").on("click", mostrarImagenes);
    $(".carta").removeClass("prevent-click");

    $(cont).html(0);

}


function mostrarImagenes(evt) {
    contadorClicks++;
    const carta = evt.target;
    $(carta).off("click");
    if (carta != null) {
        const idCarta = $(carta).data("name");
        imagen = document.createElement("img");
        $(carta).addClass("cara-delantera");
        $(imagen).attr("src", "img/" + idCarta + ".png")
        $(carta).children(".carta__imagen").html(imagen);
        $(imagen).attr("alt", idCarta);
        $("#audio").attr("src", "audio/click.mp3");
        $("#audio")[0].play();
        if($("#infiltrado").is(":checked")){
            erroresInfiltrado(carta);
            return;
        }
        cartasSeleccionadas.push(carta);
         
            if (idCarta == "bomba") {
                $("#audio").attr("src", "audio/bomba.mp3");
                $("#audio")[0].play();
                cartasSeleccionadas.splice(0, cartasSeleccionadas.length);
                setTimeout(() => {
                    bomba();
                }, 500);
                return;
            }

        if (contadorClicks == 2) {
            $(cartas).addClass("prevent-click");   
            $(botonInicio).html('<i class="fas fa-undo-alt"></i>');
            contadorClicks = 0;
            setTimeout(() => {
                deseleccionar(cartasSeleccionadas);
                $(cartas).removeClass("prevent-click");
            }, 500);
        }
    }
}

function bomba() {
    contadorClicks = 0;
    $(cartas).off("click");
    $(cartas).removeClass("cara-delantera");
    $(cartas).removeClass("correcta");

    $(cartas).each(function (index, element) {
        $(element).children().first().empty();
    });
    $(botonInicio).html('<i class="fas fa-play"></i>');
    $(barraInformativa).html(errormsg);
    $(barraInformativa).removeClass("alert-success");
    $(barraInformativa).addClass("alert-danger");
    $('.progress-bar').css('width', '0%').attr('aria-valuenow', '0');
    barajar();

}

function deseleccionar(cartas) {
    if (comprobarIguales(cartas)) {
        $(barraInformativa).html(matchmsg);
        $("#audio").attr("src", "audio/correct.mp3");
        $("#audio")[0].play();
        cartas.forEach(element => {
            $(element).addClass("correcta").effect("highlight", { color: " #1AAE00 " }, "slow");
            $(element).off("click");
        });
        $(barraInformativa).removeClass("alert-danger");
        $(barraInformativa).addClass("alert-success");
        let progresoActual = parseInt($(".progress-bar").attr("aria-valuenow")) + 15;
        $('.progress-bar').css('width', progresoActual + '%').attr('aria-valuenow', progresoActual);
        checkTotal();
        $('.alert').alert();

    } else {
        if (errores.data("maxFallos") != null && parseInt($(errores).text(), 10) == errores.data("maxFallos")) {
            $(cartas).effect("shake", "fast");
            $("#audio").attr("src", "audio/fallo.mp3");
            $("#audio")[0].play();
            $(barraInformativa).html(lose);
            $(barraInformativa).removeClass("alert-success");
            $(barraInformativa).addClass("alert-danger");
            $(".carta").addClass("prevent-click");
            alert(lose);
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } else {
            $(cartas).effect("shake", "fast");
            $("#audio").attr("src", "audio/fallo.mp3");
            $("#audio")[0].play();
            cartas.forEach(element => {
                $(element).children().first().empty();
                $(element).on("click", mostrarImagenes);
                $(element).removeClass("cara-delantera");
                $(barraInformativa).removeClass("alert-success");
                $(barraInformativa).addClass("alert-danger");
                $(barraInformativa).html(errormsg);
            });
            $('.alert').alert();
        }

    };

    cartasSeleccionadas = [];
}


function comprobarIguales(arraySeleccionados) {
    if ($(arraySeleccionados[0]).data("name") === $(arraySeleccionados[1]).data("name")) {
        return true;
    } else {
        sumarErrores();
        return false;
    }
}

function checkTotal() {
    contParsed = parseInt($(cont).text(), 10)
    contParsed++
    $(cont).html(contParsed);
    if (contParsed == contadorGanar) {
        $(barraInformativa).html(win);
        rankingJugadores(usuario, parseInt($(errores).text(), 10));
        $(barraInformativa).removeClass("alert-success");
        $(barraInformativa).removeClass("alert-danger");
        $(barraInformativa).addClass("alert-info");
        setTimeout(() => {
            window.location.reload();
        }, 10000);
    }
}

function sumarErrores() {
    errorParsed = parseInt($(errores).text(), 10);
    errorParsed++;
    $(errores).html(errorParsed);
}

function rankingJugadores(usuario, errores) {
    let arrayTop = JSON.parse(localStorage.getItem("ranking"));
    arrayTop.push({ "jugador": usuario, "errores": errores });
    arrayTop.sort(function (a, b) {
        return (a.errores - b.errores)
    });
    arrayTop.splice(4, 1);

    if (arrayTop[0]["jugador"] == usuario) {
        $(barraInformativa).html("Nuevo record!")
    }
    localStorage.setItem("ranking", JSON.stringify(arrayTop));
}

function cambiaIdioma() {
    let idiomaClick = $(this).attr("id");
    if (localStorage.getItem("idioma") == idiomaClick) {
        return;
    } else {
        if (idiomaClick == "eng") {
            localStorage.setItem("idioma", "eng");
            cambiarIdiomaJSON("eng");
            $(".btn").css("fontWeight", "bold");
            $(".btn").css("fontWeight", "normal");
        } else {
            localStorage.setItem("idioma", "esp");
            cambiarIdiomaJSON("esp");
            $(this).css("fontWeight", "bold");
            $("#eng").css("fontWeight", "normal");
        }
    }
}

function cambiarIdiomaJSON(idioma) {

    $.getJSON("lang.json", function (respuesta) {
        cambiaTexto(respuesta, idioma);
    });

    function cambiaTexto(arr, idioma) {
        const lenguaje = arr["lang"][idioma];

        $("#estadisticas").html(lenguaje.STADISTICS);

        $("#barra_informativa").html(lenguaje.INFOBAR);

        $("#tagPuntuacion").html(lenguaje.SCORE);

        $("#tagErrores").html(lenguaje.ERRORS);

        $("#tagErroresTop").html(lenguaje.ERRORS);

        $("#tagTop").html(lenguaje.TOPPLAYER);

        $("#bombaDesc").html(lenguaje.BOMB)

        lose = lenguaje.LOSE;

        matchmsg = lenguaje.MATCHMESSAGE;

        errormsg = lenguaje.ERRORMESSAGE;

        win = lenguaje.WIN;

        $("#tagDescCompleta").html(lenguaje.DESCRIPTION);

        $("#leng").html(idioma);

        $("#modalNickLabel").html(lenguaje.NICK);

        $("label[for*='facil']").html(lenguaje.LEVEL.easy);

        $("label[for*='normal']").html(lenguaje.LEVEL.normal);

        $("label[for*='dificil']").html(lenguaje.LEVEL.hard);

        $("label[for*='leyenda']").html(lenguaje.LEVEL.legend);
    }

}

function comprobarDificultad() {
    switch ($('input[name="dificultad"]:checked').val()) {
        case "facil" || "easy":
            $(mostrarAyuda).css("display", "block");

            $(mostrarAyuda).on("click", function () {
                $(cartasSeleccionadas).splice(0, cartasSeleccionadas.length);
                $(cartas).each(function (index, element) {
                    $(element).addClass("prevent-click")
                    $(element).addClass("cara-delantera");
                    imagen = document.createElement("img");
                    $(imagen).attr("src", "img/" + $(element).data("name") + ".png")
                    $(element).children(".carta__imagen").html(imagen);
                });
                $(cartas).each(function (index, element) {
                    setTimeout(() => {
                        if (!$(element).hasClass("correcta")) {
                            $(element).removeClass("cara-delantera");
                            $(element).children().first().empty();
                            $(element).removeClass("prevent-click");
                        }

                    }, 2000);
                });
                $(mostrarAyuda).off("click");

            });
            break;
        case "normal":
            $(cartas).each(function (index, element) {
                if ($(element).data("name") == "bomba") {
                    $(element).addClass("prevent-click")
                    $(element).addClass("cara-delantera");
                    imagen = document.createElement("img");
                    $(imagen).attr("src", "img/" + $(element).data("name") + ".png")
                    $(element).children(".carta__imagen").html(imagen);
                }
                setTimeout(() => {
                    $(element).removeClass("cara-delantera");
                    $(element).children().first().empty();
                    $(element).removeClass("prevent-click");
                }, 2000);
            });
            break;
        case "leyenda" || "legend":
            $(cartas).each(function (index, element) {
                if ($(element).data("name") == "bomba") {
                    $(element).addClass("prevent-click")
                    $(element).addClass("cara-delantera");
                    imagen = document.createElement("img");
                    $(imagen).attr("src", "img/" + $(element).data("name") + ".png")
                    $(element).children(".carta__imagen").html(imagen);
                }
                setTimeout(() => {
                    $(element).removeClass("cara-delantera");
                    $(element).children().first().empty();
                    $(element).removeClass("prevent-click");
                }, 1000);
            });

            errores.data("maxFallos", 3);
            break;

    }
}

function erroresInfiltrado(carta){
    
    if($(carta).data("name") == "bart"){
        $(barraInformativa).addClass("alert-danger");
        $(barraInformativa).html(lose);
        $(cartas).addClass("prevent-click");
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }else{
        contParsed = parseInt($(cont).text(), 10)
        contParsed++
        $(cont).html(contParsed);
        $(carta).addClass("correcta").effect("highlight", { color: " #1AAE00 " }, "slow");
        $(carta).off("click");
        $(barraInformativa).addClass("alert-success");
        $(barraInformativa).html("¡Sigue así!");
        $('.alert').alert();
        if(contParsed == 3){
            $(barraInformativa).addClass("alert-info");
            $(barraInformativa).html(win);
            $('.alert').alert();
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }
    }
    
}

function barajarInfiltrado(){
    $(cartas).off("click");

        if ($(cartas).data("name") != null) {
            $(cartas).removeData("name");
        }
        const arrayOpciones2 = opciones2.sort(function () { return Math.random() - 0.5 });
        for (let i = 0; i < arrayOpciones2.length; i++) {
            $(cartas[i]).data("name", arrayOpciones2[i]);
            console.log($(cartas[i]).data("name"));

        }

        $(".carta").on("click", mostrarImagenes);
        $(".carta").removeClass("prevent-click");

        $(cont).html(0);
}