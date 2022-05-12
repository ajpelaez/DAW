/*VARIABLES ABOUT POINTS*/
var pointsCounter = 0;
var failsCounter = 0;
var ranking;

/*VARIABLES ABPUT CARDS*/
var card1SRC;
var card2SRC;
var card1ID;
var card2ID;
var cardSelected;
var cardSelected2;
var cartasDescubiertas = new Array;
var message;
var blockInteractions = $("#blockInteractions");
var cartas = $(".carta");

function logout() {
    alert("Se ha cerrado la sesión de " + localStorage.getItem("usuario"));
    localStorage.removeItem("usuario");
    //sessionStorage.clear();
    $("#saludo").html("");

}

function start() {
    language = localStorage.getItem("language");
    audioBarajar();
    var userName = prompt("Escribe tu Usuario");
    $("#nick").html("" + userName);
    randomCards();
    pointsCounter = 0;
    failsCounter = 0;
    cartasDescubiertas = new Array;
    cartasDescubiertasSI = 0;
    $("#informationTitle").html("!!Aun no has seleccionado ninguna carta¡¡");
    $("#modal").modal("hide");
}

//BOTONES
if (localStorage.getItem("language") == null) {
    localStorage.setItem("language", "ES");
}

$('#ES').click(function () {
    localStorage.setItem("language", "ES");
    cambiarIdioma();
});

$('#EN').click(function () {
    localStorage.setItem("language", "EN");
    cambiarIdioma();
});
cambiarIdioma();
$("#restart").on("click", restartGame);
$("#start").on("click", start);
//FIN BOTONES

function randomCards() {
    var posiciones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
    var i, j, k;
    for (i = posiciones.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = posiciones[i - 1];
        posiciones[i - 1] = posiciones[j];
        posiciones[j] = k;
    }

    $("#" + posiciones[0]).data("imagen", "./imgs/Pikachu.png");
    $("#" + posiciones[1]).data("imagen", "./imgs/Pikachu.png");
    $("#" + posiciones[2]).data("imagen", "./imgs/mewtwo.png");
    $("#" + posiciones[3]).data("imagen", "./imgs/mewtwo.png");
    $("#" + posiciones[4]).data("imagen", "./imgs/eevee.png");
    $("#" + posiciones[5]).data("imagen", "./imgs/eevee.png");
    $("#" + posiciones[6]).data("imagen", "./imgs/Charizard.png");
    $("#" + posiciones[7]).data("imagen", "./imgs/Charizard.png");
    $("#" + posiciones[8]).data("imagen", "./imgs/digglet.png");
    $("#" + posiciones[9]).data("imagen", "./imgs/digglet.png");
    $("#" + posiciones[10]).data("imagen", "./imgs/groudon.png");
    $("#" + posiciones[11]).data("imagen", "./imgs/groudon.png");
    $("#" + posiciones[12]).data("imagen", "./imgs/cyndaquill.png");
    $("#" + posiciones[13]).data("imagen", "./imgs/cyndaquill.png");
    $("#" + posiciones[14]).data("imagen", "./imgs/bomba.png");

    $(".carta").off("click");
    //Muestra
    $(".carta").click(function (e) {
        $(this).show("fade", {}, 10, function () {
            $(this).attr("src", $(this).data("imagen"));
            
            $(this).removeAttr("style").hide().fadeIn();
        });
        $(this).css("opacity", 1);
        chekCard(e);
        victory();
    })
}

function victory() {
    if (pointsCounter == 7) {
        audioVictoria();
    }
}

function restartGame() {
    if (!userName == "") {
        language = localStorage.getItem("language");
        audioBarajar();

        if (language == "ES") {
            putInSpanish();
        } if (language == "EN") {
            putInEnglish();
        }
        randomCards();
        pointsCounter = 0;
        failsCounter = 0;
        cartasDescubiertas = new Array;
        cartasDescubiertasSI = 0;

        $(cartas).css("opacity", 1);
        $(cartas).removeAttr('src');
        $(cartas).attr('src', "./imgs/pokeball.png");
        $("#informationTitle").html("!!Aun no has seleccionado ninguna carta¡¡");
    }
}
//Funcion Bomba
function bomba() {
    audioBomba();
    pointsCounter = 0;
    cartasDescubiertas = new Array;
    cartasDescubiertasSI = 0;



    setTimeout(function () {
        randomCards();
        audioBarajar();
        $(cartas).css("opacity", 1);
        $(cartas).removeAttr('src');
        $(cartas).attr('src', "./imgs/pokeball.png");
    }, 1000);
}
//Fin Funcion Bomba
//  FUNCIONES DE SONIDO

function audioSeleccion() {
    const audio = new Audio("./audio/seleccionar-carta.mp3");
    audio.volume = 0.5;
    audio.play();
}

function audioBomba() {
    const audio = new Audio("./audio/bomba.mp3");
    audio.volume = 0.5;
    audio.play();
}

function audioBarajar() {
    const audio = new Audio("./audio/barajar.mp3");
    audio.volume = 0.5;
    audio.play();
}

function audioVictoria() {
    const audio = new Audio("./audio/victoria.mp3");
    audio.volume = 0.5;
    audio.play();
}

function audioAcierto() {
    const audio = new Audio("./audio/acierto.mp3");
    audio.volume = 0.5;
    audio.play();
}

function audioFallo() {
    const audio = new Audio("./audio/fallo.mp3");
    audio.volume = 0.5;
    audio.play();
}

// FIN FUNCIONES DE SONIDO

//FUNCION SELECCION DE CARTA

function chekCard(e) {
    if ($(e.target).data("imagen") == "./imgs/bomba.png") {
        bomba();
    }
    if (card1SRC == null) {
        audioSeleccion();
        card1SRC = e.target.src;
        card1ID = e.target.id;
        console.log(e.target.id);
        cardSelected = $("#" + e.target.id);

    } else {

        if (card2SRC == null) {
            audioSeleccion();
            card2SRC = e.target.src;
            card2ID = e.target.id;
            cardSelected2 = $("#" + e.target.id);

            if (card1SRC == card2SRC) {

                if (card1ID == card2ID) {
                    $("#informationTitle").html("las 2 cartas seleccionadas es la misma. Vuelve a seleccionar la 2ª carta");
                    card2SRC = null;
                } else {
                    pointsCounter = pointsCounter + 1;
                    audioAcierto();
                    changeInformationTitleWINPoint();
                    {
                        cartasDescubiertas += new Array(card1ID);
                        cartasDescubiertas += new Array(card2ID);
                    }

                    if (pointsCounter == 7) {
                        victory();
                        var information = $("#information");

                        if (localStorage.getItem("fails") == null || failsCounter < localStorage.getItem("fails")) {
                            localStorage.setItem("topName", userName);
                            localStorage.setItem("score", pointsCounter);
                            localStorage.setItem("fails", failsCounter);
                        }

                        if (language == "ES") {
                            informationTitle.textContent = "Excelente " + userName + ", has ganado los 7 puntos. El juego ha terminado";
                            victory();
                        }

                        if (language == "EN") {
                            informationTitle.textContent = "Excelent " + userName + ", you win the 7 points. The Game is finish";
                            victory();
                        }
                    }
                    setTimeout(() => {
                        card1ID = null;
                        card2ID = null;
                        card1SRC = null;
                        card2SRC = null;
                        cardSelected = null;
                        cardSelected2 = null;
                    }, 1000);
                }
            } else {
                blockInteractions.css("display", "block");
                failsCounter = failsCounter + 1;
                changeInformationTitleFailPoint();
                setTimeout(() => {
                    blockInteractions.hide();
                    audioFallo();
                    $(cardSelected).css("opacity", 1);
                    $(cardSelected2).css("opacity", 1);
                    cardSelected.removeAttr('src');
                    cardSelected.attr('src', "./imgs/pokeball.png");
                    cardSelected2.removeAttr('src');
                    cardSelected2.attr('src', "./imgs/pokeball.png");
                    card1ID = null;
                    card2ID = null;
                    card1SRC = null;
                    card2SRC = null;
                    cardSelected = null;
                    cardSelected2 = null;
                }, 1000);
            }
        }

    }
}

// FIN FUNCION SELECCION DE CARTA

function showAlert(message) {
    setTimeout(() => {
        alert(message);
    }, 500);
}

//FUNCION QUE MUESTRA LA CARTA
function showCard(idCarta) {
    $(this).style("opacity", 1);
}
// FIN FUNCION QUE MUESTRA LA CARTA

//FUNCION PARA CAMBIAR LOS PUNTOS
function changeInformationTitleWINPoint() {
    localStorage.setItem("puntos", pointsCounter);
    if (language == "ES") {
        if (pointsCounter != 0 || pointsCounter < 7) {
            showAlert
            informationTitle.textContent = "Has ganado un punto, ahora tienes: " + pointsCounter;
            localStorage.setItem("language", "EN");//create o modify the value of the WebStorage
        }
        $("#pointsMarkerSuccessful").html(pointsCounter + "<i class='fas fa-check-circle'>");
    }
    else if (language == "EN") {
        if (pointsCounter != 0 || pointsCounter < 7) {
            $("#informationTitle").html("You Win 1 Point, now you have: " + pointsCounter);
        }
        $("#pointsMarkerSuccessful").html(pointsCounter + "<i class='fas fa-check-circle'>");

    }
}
// FIN FUNCION PARA CAMBIAR LOS PUNTOS

//FUNCION PARA CAMBIAR LOS ERRORES
function changeInformationTitleFailPoint() {
    if (language == "ES") {
        $("#pointsMarkerFailed").html(failsCounter + "<i class='far fa-times-circle'>");
        if (failsCounter != 0) {
            $("#informationTitle").html("Has fallado, tienes: " + failsCounter + " fallos.");
        }

    } if (language == "EN") {
        $("#pointsMarkerFailed").html(failsCounter + "<i class='far fa-times-circle'>");
        if (failsCounter != 0) {
            $("#informationTitle").html("You fail, you have: " + failsCounter + " faults.");
        }

    }

}

// FIN FUNCION PARA CAMBIAR LOS ERRORES

//FUNCION RANKING
function ranking() {
    primero = $("#primerPuesto");
    $("#primero").html("El usuario que ha conseguido mayor puntuación a sido = " + userName);
}

function cambiarIdioma() {
    let idioma = localStorage.getItem("language");
    $.getJSON("lang.json", function (arr) {
        $("#UserScore").html(arr.lang[idioma].score);
        $("#Error-Actual").html(arr.lang[idioma].errors);
    });
}