$(".carta").css('background-color', 'transparent');
$("#1").css('background-color', 'transparent');
$("#2").css('background-color', 'transparent');
$("#3").css('background-color', 'transparent');
$("#4").css('background-color', 'transparent');
$("#5").css('background-color', 'transparent');
$("#6").css('background-color', 'transparent');
$("#7").css('background-color', 'transparent');
$("#8").css('background-color', 'transparent');
$("#9").css('background-color', 'transparent');
$("#10").css('background-color', 'transparent');
$("#11").css('background-color', 'transparent');
$("#12").css('background-color', 'transparent');
$("#13").css('background-color', 'transparent');
$("#14").css('background-color', 'transparent');
$("#15").css('background-color', 'transparent');


//Chek if the browser supports Web Storage
if (typeof (Storage) !== "undefined") {
}

else {//Hold the message about the browser don´t support Web Storage, because it´s necesary to run correctly
    alert("El navegador no soporta Web Storage");

}

/*function logout() {
    alert("Se ha cerrado la sesión de " + localStorage.getItem("usuario"));
    localStorage.removeItem("usuario");
    //sessionStorage.clear();
    document.getElementById("saludo").innerHTML = "";
}*/


window.addEventListener("load", start, false)
/*VARIABLES ABOUT POINTS*/
let pointsCounter = 0;
let failsCounter = 0;
var ranking;
let cadsDiscovered = 0;
let progressBarValue = 0;
let progresBar = 0;

/*VARIABLES ABPUT CARDS*/
let card1SRC;
let card2SRC;
let card1ID;
let card2ID;
let cardSelected;
let cardSelected2;
let cartasDescubiertas = new Array;
let message;

function start() {  //Restart counter to 0
    language = localStorage.getItem("language");
    languageChangeJSON();
    /*
        language = getCookie("language");*/
    /*
        if (language == "ES") {
            putInSpanish();
        } if (language == "EN") {
            putInEnglish();
        }
    */
    randomCards();
    pointsCounter = 0;
    failsCounter = 0;
    let cartasDescubiertas = new Array;
    let cartasDescubiertasSI = 0;
    //let cartas = document.getElementsByClassName("carta");
    let cartas = $('.carta');

    if (cartas.length > 0) {
        for (i = 0; i < cartas.length; i++) {
            cartas[i].addEventListener("click", chekCard, false);
            // cartas[i].on("click", chekCard);
        }
    }
}


let userName = prompt("Escribe tu Usuario");
if (userName != null) {
    //nick.innerHTML = "" + userName;
    $("#nick").html("" + userName);
} else {
    //nick.innerHTML = "NO NAME USER";
    $("#nick").html("NO NAME USER");
}
function randomCards() {
    let posiciones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
    let i, j, k;
    for (i = posiciones.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = posiciones[i - 1];
        posiciones[i - 1] = posiciones[j];
        posiciones[j] = k;
    }

    $("#" + posiciones[0]).data("src", "./imgs/Pikachu.png");
    $("#" + posiciones[1]).data("src", "./imgs/Pikachu.png");
    $("#" + posiciones[2]).data("src", "./imgs/Charizard.png");
    $("#" + posiciones[3]).data("src", "./imgs/Charizard.png");
    $("#" + posiciones[4]).data("src", "./imgs/mewtwo.png");
    $("#" + posiciones[5]).data("src", "./imgs/mewtwo.png");
    $("#" + posiciones[6]).data("src", "./imgs/groudon.png");
    $("#" + posiciones[7]).data("src", "./imgs/groudon.png");
    $("#" + posiciones[8]).data("src", "./imgs/eevee.png");
    $("#" + posiciones[9]).data("src", "./imgs/eevee.png");
    $("#" + posiciones[10]).data("src", "./imgs/digglet.png");
    $("#" + posiciones[11]).data("src", "./imgs/digglet.png");
    $("#" + posiciones[12]).data("src", "./imgs/squirtle.png");
    $("#" + posiciones[13]).data("src", "./imgs/squirtle.png");
    $("#" + posiciones[14]).data("src", "./imgs/bomba.png");
}


function chekCard(e) {
    // playRestart.textContent = "RESTART";

    if (e.target.className == "block") {
        alert("la carta seleccionada " + e + " ya ha sido descubierta");
        return;
    }
    //Comprobacion de la carta bomba
    console.log(e.target);
    e.target.src = $(e.target).data("src");
    var url = new URL(e.target.src);
    console.log(e.target);
    console.log(e.target.src);
    esBomba = url.pathname;
    if (esBomba == "/imgs/bomba.png") {
        //si encuentro la bomba le doy la vuelta a la carta y muestro mensaje
        cardSelected = document.getElementById(e.target.id);
        // cardSelected = $('e.target.id');
        //cardSelected = $(e.target).data("id");
        showCard(cardSelected);
        $(".alert-success").removeClass("alert-primary alert-success").addClass("dark alert")
        $(".alert-danger").removeClass("alert-primary alert-danger").addClass("dark alert")
        ErrorCounterAndClean();
        if (language == "ES") {
            informationTitle.textContent = "BOMBA!!!, " + userName + " las cartas encontradas se resetearan y mantendras el contador de fallos";
        }
        if (language == "EN") {
            informationTitle.textContent = "BOMB!!!, " + userName + " the cards founded will be reset, and you hold the fails counter";
        }
    } else {
        if (card1SRC == null) {
            card1SRC = e.target.src;
            card1ID = e.target.id;
            // cardSelected = document.getElementById(e.target.id);
            cardSelected = $('#' + e.target.id)[0];//Deberia quitar el 0 pero en ese cas0 debo cambiar el resto de cardSelected.className por .addAtrribute 
            showCard(cardSelected);
        } else {
            if (card2SRC == null) {
                card2SRC = e.target.src;
                card2ID = e.target.id;
                //cardSelected2 = document.getElementById(e.target.id);
                cardSelected2 = $('#' + e.target.id)[0];
                showCard(cardSelected2);
                if (card1SRC == card2SRC) {
                    if (card1ID == card2ID) {
                        alert("las 2 cartas seleccionadas es la misma. Vuelve a seleccionar la 2ª carta");
                        card2SRC = null;
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

                    ErrorCounterAndClean();

                }
            }

        }
    }
}

function PointsCounterAndClean(){
    
}

function ErrorCounterAndClean(){
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
        //  cardSelected.style.opacity = 0;
        //  cardSelected2.style.opacity = 0;

    }, 1000);
}

function showAlert(message) {
    setTimeout(() => {
        alert(message);
    }, 500);
}

function showCard(idCarta) {
    // idCarta.style.opacity = 1;
    //SOUND AT TURN CARD
    const music = new Audio('/audio/cardDiscover.mp3');
    music.play();
  // $("#"+idCarta).fadeIn("slow");

}



function changeInformationTitleWINPoint() {
    $(".alert-primary").removeClass("alert-primary alert-danger").addClass("alert-success")
    $(".alert-danger").removeClass("alert-primary alert-danger").addClass("alert-success")
    if (language == "ES") {
        if (pointsCounter != 0) {
            // informationTitle.textContent = "Has ganado un punto, ahora tienes: " + pointsCounter;
            $("#informationTitle").html("Has ganado un punto, ahora tienes: " + pointsCounter);
            localStorage.setItem("language", "EN");//create o modify the value of the WebStorage
        }
        //pointsMarkerSuccessful.innerHTML = pointsCounter + "<i class='fas fa-check-circle'>";
        $("#pointsMarkerSuccessful").html(pointsCounter + "<i class='fas fa-check-circle'>");
    }
    else if (language == "EN") {
        if (pointsCounter != 0) {
            //informationTitle.innerHTML = "You Win 1 Point, now you have: " + pointsCounter;
            $("#informationTitle").html("You Win 1 Point, now you have: " + pointsCounter);
        }
        // pointsMarkerSuccessful.innerHTML = pointsCounter + "<i class='fas fa-check-circle'>";
        $("#pointsMarkerSuccessful").html(pointsCounter + "<i class='fas fa-check-circle'>");
    }
}

function changeInformationTitleFailPoint() {
    $(".alert-primary").removeClass("alert-primary").addClass("alert-danger")
    $(".alert-success").removeClass("alert-primary alert-success").addClass("alert-danger")
    if (language == "ES") {
        //pointsMarkerFailed.innerHTML = failsCounter + "<i class='far fa-times-circle'>";
        $("#pointsMarkerFailed").html(failsCounter + "<i class='far fa-times-circle'>");
        if (failsCounter != 0) {
            // informationTitle.innerHTML = "Has fallado, tienes: " + failsCounter + " fallos.";
            $("#informationTitle").html("Has fallado, tienes: " + failsCounter + " fallos.");
        }

    } if (language == "EN") {
        //pointsMarkerFailed.innerHTML = failsCounter + "<i class='far fa-times-circle'>";
        $("#pointsMarkerFailed").html(failsCounter + "<i class='far fa-times-circle'>");
        if (failsCounter != 0) {
            // informationTitle.innerHTML = "You fail, you have: " + failsCounter + " faults.";
            $("#informationTitle").html("You fail, you have: " + failsCounter + " faults.");
        }

    }

}

function ranking() {
    //primero = document.getElementById("primerPuesto");
    primero = $('#primerPuesto')
    primero.innerHTML = "El usuario que ha conseguido mayor puntuación a sido = " + userName;
}



function languageChangeXML() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            importXML(this);
        }
    };
    xhr.open("GET", "/lang/language.xml", true);
    xhr.send();
}


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
    //mainTitle.innerHTML = json.lang[language].MainTitle;
    $("#mainTitle").html(json.lang[language].MainTitle);
    /*CHANGE SCORE BOX*/
    //scoreTitle.innerHTML = json.lang[language].Score;
    $("#scoreTitle").html(json.lang[language].Score);
    // errorsTitle.innerHTML = json.lang[language].Errors;
    $("#errorsTitle").html(json.lang[language].Errors);
    /*CHANGE TOP PLAYER BOX*/
    //menuTopPlayerTitle.innerHTML = json.lang[language].TopPlayer;
    $("#menuTopPlayerTitle").html(json.lang[language].TopPlayer);
    //topPointsTitle.innerHTML = json.lang[language].Fails;
    $("#topPointsTitle").html(json.lang[language].Fails);
    //menuTopPlayer.innerHTML = localStorage.getItem("topName");
    $("#menuTopPlayer").html(localStorage.getItem("topName"));
    //topPoints.innerHTML = localStorage.getItem("fails");
    $("#topPoints").html(localStorage.getItem("fails"));

    /*CHANGE LANGUAGE BOX*/
    // languageTitle.innerHTML = json.lang[language].Language;
    $("#languageTitle").html(json.lang[language].Language);
    localStorage.setItem("language", language);//create o modify the value of the WebStorage

    /*INFORMATION BOX*/
    let infomationAlert = "";
    //informationTitle.innerHTML = infomationAlert;
    $("#informationTitle").html("" + infomationAlert);
}


function putInEnglish() {
    language = "EN";
    localStorage.setItem("language", "EN");//create o modify the value of the WebStorage

    changeInformationTitleWINPoint();
    changeInformationTitleFailPoint();
    languageChangeJSON();
}

function putInSpanish() {
    language = "ES";
    localStorage.setItem("language", "ES");//crea o modifica el valor de Web Storage

    changeInformationTitleWINPoint();
    changeInformationTitleFailPoint();
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