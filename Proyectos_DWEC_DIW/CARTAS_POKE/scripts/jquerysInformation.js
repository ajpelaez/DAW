
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


function ranking() {
    //primero = document.getElementById("primerPuesto");
    primero = $('#primerPuesto')
    primero.innerHTML = "El usuario que ha conseguido mayor puntuación a sido = " + userName;
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
