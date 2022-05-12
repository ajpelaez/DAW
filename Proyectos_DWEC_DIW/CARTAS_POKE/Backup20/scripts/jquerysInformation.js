
//Chek if the browser supports Web Storage
if (typeof (Storage) !== "undefined") {
}

else {//Hold the message about the browser don´t support Web Storage, because it´s necesary to run correctly
    alert("El navegador no soporta Web Storage");

}


window.addEventListener("load", start, false)

const musicKoffing = new Audio('../audio/koffing.mp3');
const musicPikachu = new Audio('../audio/pikachu.mp3');
const musicSquirtle = new Audio('../audio/squirtle.mp3');
const musicCharmander = new Audio('../audio/charmander.mp3');
const musicJigglypuff = new Audio('../audio/jigglypuff.mp3');
const musicBulbasur = new Audio('../audio/bulbasur.mp3');
const musicMismagius = new Audio('../audio/mismagius.mp3');
const musicGroudon = new Audio('../audio/groudon.mp3');
/*VARIABLES ABOUT POINTS*/
let pointsCounter = 0;
let failsCounter = 0;
var ranking;
let cadsDiscovered = 0;
let progressBarValue = 0;
let progresBar = 0;

function start() {  //Restart counter to 0
    language = localStorage.getItem("language");
    languageChangeJSON();
    pointsCounter = 0;
    failsCounter = 0;
    let cartasDescubiertas = new Array;
    let cartasDescubiertasSI = 0;
    //let cartas = document.getElementsByClassName("carta");



    /*MOUSE HOVER PIKACHU*/
    $(document).ready(function () {
        $("#Pikachu").hover(function () {
            $("#Pikachu").css("transform","scale(1.2)", "transition","1s");
            $("#Pikachu").css("border", "10px solid yellow");
            $("#Pikachu").css("box-shadow", "-2px 2px 89px 0px yellow inset, 1px 1px 45px 8px yellow");
            musicPikachu.play();
        }, function () {
            $("#Pikachu").css("transform","scale(1.0)", "transition","1s");
            $("#Pikachu").css("box-shadow", "none");
            musicPikachu.pause();
        });
    });

    /*MOUSE HOVER SQUIRTLE*/
    $(document).ready(function () {
        $("#Squirtle").hover(function () {
             $("#Squirtle").css("transform","scale(1.2)", "transition","1s");
             $("#Squirtle").css("border", "10px solid blue");
             $("#Squirtle").css("box-shadow", "-2px 2px 89px 0px blue inset, 1px 1px 45px 8px blue");
            musicSquirtle.play();
        }, function () {
            musicSquirtle.pause();
             $("#Squirtle").css("transform","scale(1.0)", "transition","1s");
             $("#Squirtle").css("box-shadow", "none");
        });
    });

    /*MOUSE HOVER CHARMANDER*/
    $(document).ready(function () {
        $("#Charmander").hover(function () {
            $("#Charmander").css("transform","scale(1.2)", "transition","1s");
            $("#Charmander").css("border", "10px solid orange");
            $("#Charmander").css("box-shadow", "-2px 2px 89px 0px orange inset, 1px 1px 45px 8px orange");
            /*Reproducir Audio */
            musicCharmander.play();
        }, function () {
            musicCharmander.pause();
            $("#Charmander").css("transform","scale(1.0)", "transition","1s");
            $("#Charmander").css("box-shadow", "none");
        });
    });

       /*MOUSE HOVER MISMAGIUS*/
       $(document).ready(function () {
        $("#Mismagius").hover(function () {
            $("#Mismagius").css("transform","scale(1.2)", "transition","1s");
            $("#Mismagius").css("border", "10px solid purple");
            $("#Mismagius").css("box-shadow", "-2px 2px 89px 0px purple inset, 1px 1px 45px 8px purple");
            musicMismagius.play();
        }, function () {
            $("#Mismagius").css("transform","scale(1.0)", "transition","1s");
            $("#Mismagius").css("box-shadow", "none");
            musicMismagius.pause();
        });
    });

    /*MOUSE HOVER jigglypuff*/
    $(document).ready(function () {
        $("#Jigglypuff").hover(function () {
            $("#Jigglypuff").css("transform","scale(1.2)", "transition","1s");
            $("#Jigglypuff").css("border", "10px solid pink");
            $("#Jigglypuff").css("box-shadow", "-2px 2px 89px 0px pink inset, 1px 1px 45px 8px pink");
            musicJigglypuff.play();
        }, function () {
            musicJigglypuff.pause();
            $("#Jigglypuff").css("transform","scale(1.0)", "transition","1s");
            $("#Jigglypuff").css("box-shadow", "none");
        });
    });

       /*MOUSE HOVER GROUDON*/
       $(document).ready(function () {
        $("#Groudon").hover(function () {
            $("#Groudon").css("transform","scale(1.2)", "transition","1s");
            $("#Groudon").css("border", "10px solid coral");
            $("#Groudon").css("box-shadow", "-2px 2px 89px 0px red inset, 1px 1px 45px 8px red");
            musicGroudon.play();
        }, function () {
            musicGroudon.pause();
            $("#Groudon").css("transform","scale(1.0)", "transition","1s");
            $("#Groudon").css("box-shadow", "none");
        });
    });
    


    /*MOUSE HOVER BULBASUR*/
    $(document).ready(function () {
        $("#Bulbasur").hover(function () {
            $("#Bulbasur").css("transform","scale(1.2)", "transition","1s");
            $("#Bulbasur").css("border", "10px solid green");
            $("#Bulbasur").css("box-shadow", "-2px 2px 89px 0px green inset, 1px 1px 45px 8px green");
            musicBulbasur.play();
        }, function () {
            musicBulbasur.pause();
            $("#Bulbasur").css("transform","scale(1.0)", "transition","1s");
            $("#Bulbasur").css("box-shadow", "none");
        });
    });

    /*MOUSE HOVER KOOFING*/
    $(document).ready(function () {
        $("#Koffing").hover(function () {
            $("#Koffing").css("transform","scale(1.1)", "transition","1s");
            $("#Koffing").css("border", "10px solid grey");
            $("#Koffing").css("box-shadow", "-2px 2px 89px 0px black inset, 1px 1px 45px 8px black");
            musicKoffing.play();
        }, function () {
            musicKoffing.pause();
            $("#Koffing").css("transform","scale(1.0)", "transition","1s");
            $("#Koffing").css("box-shadow", "none");
        });
    });





}

$(document).ready(function () {
    $("#prueba").hover(function () {
        $("#prueba").css("background-color", "#000000");
    }, function () {
        $("#prueba").css("background-color", "#C3C3C3");
    });
});




let userName = "Juanmi";
if (userName != null) {
    //nick.innerHTML = "" + userName;
    $("#nick").html("" + userName);
} else {
    //nick.innerHTML = "NO NAME USER";
    $("#nick").html("NO NAME USER");
}

function reproduceSound() {

}

function chekCard(e) {
    if (e.target.className == "block") {
        alert("la carta seleccionada " + e + " ya ha sido descubierta");
        return;
    }
    //Comprobacion de la carta bomba
    console.log(e.target);
    console.log(e.target.src);
    e.target.src = $(e.target).data("src");
    var url = new URL(e.target.src);
    esBomba = url.pathname;
    if (esBomba == "/imgs/bomba.png") {
        bombcard(e);
    } else {
        if (card1SRC == null) {
            card1SRC = e.target.src;
            card1ID = e.target.id;
            cardSelected = $('#' + e.target.id)[0];//Deberia quitar el 0 pero en ese cas0 debo cambiar el resto de cardSelected.className por .addAtrribute 
            showCard(card1ID);
        } else {
            if (card2SRC == null) {
                card2SRC = e.target.src;
                card2ID = e.target.id;
                cardSelected2 = $('#' + e.target.id)[0];
                showCard(card2ID);
                if (card1SRC == card2SRC) {
                    if (card1ID == card2ID) {
                        alert("las 2 cartas seleccionadas es la misma. Vuelve a seleccionar la 2ª carta");
                        card2SRC = null;
                        card2ID = null;
                        cardSelected2 = null;
                    } else {
                        pointsCounter = pointsCounter + 1;
                        //bloqueo las cartas
                        cardSelected.className = "block";
                        cardSelected2.className = "block";
                        changeInformationTitleWINPoint();
                        progressBarValue = progressBarValue + 14, 28;
                        // progressBar.innerHTML = progressBarValue;
                        $("#progessBar").html(progressBarValue);
                        //sonido ganador
                        const musicPikachu = new Audio('/audio/pikachu.mp3');
                        musicPikachu.play();
                        {
                            cartasDescubiertas += new Array(card1ID);
                            cartasDescubiertas += new Array(card2ID);
                        }
                        if (pointsCounter == 7) {
                            //cambiar clase de la caja cuando ganas a warning alert
                            $(".alert-success").removeClass("alert-primary alert-success").addClass("warning alert")
                            $(".alert-danger").removeClass("alert-primary alert-danger").addClass("warning alert")
                            let information = $('#information');
                            if (localStorage.getItem("fails") == null || failsCounter < localStorage.getItem("fails")) {
                                localStorage.setItem("topName", userName);//create o modify the value topName of the WebStorage
                                localStorage.setItem("score", pointsCounter);//create o modify the value score of the WebStorage
                                localStorage.setItem("fails", failsCounter);//create o modify the value fails of the WebStorage
                            }
                            //sonido ganador
                            const music = new Audio('/audio/victory.mp3');
                            music.play();
                            if (language == "ES") {
                                informationTitle.textContent = "Excelente " + userName + ", has ganado los 6 puntos. El juego ha terminado";
                            }
                            if (language == "EN") {
                                informationTitle.textContent = "Excelent " + userName + ", you win the 6 points. The Game is finish";
                            }
                        }
                        card1ID = null;
                        card2ID = null;
                        card1SRC = null;
                        card2SRC = null;
                        cardSelected = null;
                        cardSelected2 = null;
                        //     setTimeout(() => {
                        //     }, 1000);
                    }
                } else {
                    ErrorCounterAndClean();
                }
            }

        }
    }
}

function bombcard(e) {
    if (card1SRC == null) {
        card1SRC = e.target.src;
        card1ID = e.target.id;
        cardSelected = $('#' + e.target.id)[0];
    }
    else {
        if (card2SRC == null) {
            card2SRC = e.target.src;
            card2ID = e.target.id;
            cardSelected2 = $('#' + e.target.id)[0];
        }
    }
    $(".alert-success").removeClass("alert-primary alert-success").addClass("alert dark")
    $(".alert-danger").removeClass("alert-primary alert-danger").addClass("alert dark")
    ErrorCounterAndClean();
    if (language == "ES") {
        informationTitle.textContent = "BOMBA!!!, " + userName + " las cartas encontradas se resetearan y mantendras el contador de fallos";
    }
    if (language == "EN") {
        informationTitle.textContent = "BOMB!!!, " + userName + " the cards founded will be reset, and you hold the fails counter";
    }
    return;
}

function PointsCounterAndClean() {

}

function ErrorCounterAndClean() {
    failsCounter = failsCounter + 1;
    changeInformationTitleFailPoint();
    setTimeout(() => {
        cardSelected.src = "";
        cardSelected2.src = "";
        card1ID = null;
        card2ID = null;
        card1SRC = null;
        card2SRC = null;
        cardSelected = null;
        cardSelected2 = null;
    }, 1000);
}

function showAlert(message) {
    setTimeout(() => {
        alert(message);
    }, 500);
}

function showCard(idCarta) {
    //SOUND AT TURN CARD
    const music = new Audio('/audio/cardDiscover.mp3');
    music.play();
    $("#" + idCarta).fadeIn("slow");
    //alert(idCarta);
}



function changeInformationTitleWINPoint() {
    $(".alert-primary").removeClass("alert-primary").addClass("alert-success")
    $(".alert-danger").removeClass("alert-primary alert-danger").addClass("alert-success")
    $(".alert dark").removeClass("alert dark").addClass("alert-success")
    if (language == "ES") {
        $("#informationTitle").html("Has ganado un punto, ahora tienes: " + pointsCounter);
        $("#pointsMarkerSuccessful").html(pointsCounter + "<i class='fas fa-check-circle'>");
    }
    else if (language == "EN") {
        $("#informationTitle").html("You Win 1 Point, now you have: " + pointsCounter);
        $("#pointsMarkerSuccessful").html(pointsCounter + "<i class='fas fa-check-circle'>");
    }
}

function changeInformationTitleFailPoint() {
    $(".alert-primary").removeClass("alert-primary").addClass("alert-danger")
    $(".alert-success").removeClass("alert-success").addClass("alert-danger")
    $(".alert dark").removeClass("alert dark").addClass("alert-danger")
    if (language == "ES") {
        $("#informationTitle").html("Has fallado, tienes: " + failsCounter + " fallos.");
        $("#pointsMarkerFailed").html(failsCounter + "<i class='far fa-times-circle'>");
    }
    if (language == "EN") {
        $("#informationTitle").html("You fail, you have: " + failsCounter + " faults.");
        $("#pointsMarkerFailed").html(failsCounter + "<i class='far fa-times-circle'>");
    }

}

function ranking() {
    //primero = document.getElementById("primerPuesto");
    primero = $('#primerPuesto')
    primero.innerHTML = "El usuario que ha conseguido mayor puntuación a sido = " + userName;
}



/*function languageChangeXML() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            importXML(this);
        }
    };
    xhr.open("GET", "/lang/language.xml", true);
    xhr.send();
}
*/

function languageChangeJSON() {
    let xmlhttp = new XMLHttpRequest();
    let url = "lang/lang.json";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            importJson(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function importJson(json) {
    let language = localStorage.getItem("language");
    /*****CHANGE LANGUAGE IN MAINMENU*****/
    /*****CHANGE LANGUAGE IN OPTIONS MENU*****/
    $("#mainTitle").html(json.lang[language].MainTitle);
    $("#optionsTitle").html(json.lang[language].Options);
    $("#gameOption").html(json.lang[language].Game);
    $("#informationOption").html(json.lang[language].Information);

    /*****CHANGE LANGUAGE IN LANGUAGE MENU*****/
    $("#languageTitle").html(json.lang[language].Language);
    $("#ES").html(json.lang[language].Spanish);
    $("#EN").html(json.lang[language].English);


    /*CHANGE SCORE BOX*/
    $("#scoreTitle").html(json.lang[language].Score);
    $("#errorsTitle").html(json.lang[language].Errors);
    /*CHANGE TOP PLAYER BOX*/
    $("#menuTopPlayerTitle").html(json.lang[language].TopPlayer);
    $("#topPointsTitle").html(json.lang[language].Fails);
    $("#menuTopPlayer").html(localStorage.getItem("topName"));
    $("#topPoints").html(localStorage.getItem("fails"));

    /*CHANGE LANGUAGE BOX*/
    // languageTitle.innerHTML = json.lang[language].Language;
    $("#languageTitle").html(json.lang[language].Language);
    localStorage.setItem("language", language);//create o modify the value of the WebStorage

    /*INFORMATION BOX*/
    let infomationAlert = "";
    //informationTitle.innerHTML = infomationAlert;
    $("#informationTitle").html("" + json.lang[language].informationAlert);

}


function putInEnglish() {
    language = "EN";
    localStorage.setItem("language", "EN");//create o modify the value of the WebStorage

    //  changeInformationTitleWINPoint();
    //  changeInformationTitleFailPoint();
    languageChangeJSON();
}

function putInSpanish() {
    language = "ES";
    localStorage.setItem("language", "ES");//crea o modifica el valor de Web Storage

    //  changeInformationTitleWINPoint();
    //  changeInformationTitleFailPoint();
    languageChangeJSON();
}


function inicio() {
    $("p").on({
        mouseenter: function () {
            $(this).css("background-color", "lightblue");
        }
    })
}

function mensajeParametros(e) {
    alert(e.data.nombre + "" + e.data.apellidos);

}

function inicio() {
    jQuery.fx.speeds.muyRapido = 50;
}

//ocultar
function ocultar() {
    $("#ocultar").click(function () {
        s("p").hide("fast");
    })
}

//Mostrar
function mostrar() {
    $("#mostrar").click(function () {
        s("p").show("fast");
    })
}

//Toogle
function mostrar() {
    $("#toogle").click(function () {
        s("p").toogle("fast");
    })
}

//FadeOut
function fadeToogle() {
    $("#fadeToogle").click(function () {
        s("p").toogle("fast");
    })
}

$("#animar").click(function () {
    $("#div1").animate({
        left: '250px',
        opacity: '0.5',
    })
})

//Funcion Callback
$("#callback").click(function () {

})