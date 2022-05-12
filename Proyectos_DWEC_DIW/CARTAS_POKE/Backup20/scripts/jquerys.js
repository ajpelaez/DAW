//$(".imgCard").css('background-color', 'transparent');



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
let cartasDescubiertas = new Array;
const cards = $(".carta");
var blockInteractions = $("#blockInteractions");

/*VARIABLES ABOUT CARDS*/
let card1SRC;
let card2SRC;
let card1ID;
let card2ID;
let cardSelected;
let cardSelected2;
let message;
let myModal;
let currentUser;
let levelUser;
let dificulty;
let positions;
let flag = true;

/**** Variables ABOUT RANKING */
const defaultUsers = [
    { userName: "player 1", fails: 10 },
    { userName: "player 2", fails: 20 },
    { userName: "player 3", fails: 40 },
    { userName: "player 4", fails: 60 },
    { userName: "player 5", fails: 80 },
]

/* CONSTANS ABOUT AUDIOS*/
const musicKoffing = new Audio('../audio/koffing.mp3');
const musicPikachu = new Audio('../audio/pikachu.mp3');
const musicSquirtle = new Audio('../audio/squirtle.mp3');
const musicCharmander = new Audio('../audio/charmander.mp3');
const musicJigglypuff = new Audio('../audio/jigglypuff.mp3');
const musicBulbasur = new Audio('../audio/bulbasur.mp3');
const musicMismagius = new Audio('../audio/mismagius.mp3');
const musicGroudon = new Audio('../audio/groudon.mp3');

function start() {  //Restart counter to 0
    /*****Lenguage By Default ES if we doesn´t Lenguage in LocalStorage *****/
    if (!localStorage.getItem("language")) localStorage.setItem('language', 'ES')
    if (!localStorage.getItem("userStore")) localStorage.setItem('userStore', JSON.stringify(defaultUsers))
    /***** I need the var language for other parts and to change language in all the game*****/
    language = localStorage.getItem("language");
    languageChangeJSON();
    paintToPlayer()
    /*****Modal Start*****/
    myModal = new bootstrap.Modal(document.getElementById('initModal'))
    myModal.show();

    //showboard();
    //  showCards();
    let cartasDescubiertas = new Array;
    let cartasDescubiertasSI = 0;
    $('.carta').click(chekCard);
}



function play() {
    /*****We catch the currentUser and we put on the class Nick*****/
    currentUser = $("#userName").val();

    /***** WE PUT currentUser and Level in the webpage *****/
    $("#nick").html("" + currentUser + ", Level: " + levelUser);
    $("#level").html("" + levelUser);

    /***** PUT COUNTER TO 0 *****/
    pointsCounter = 0;
    $("#pointsMarkerSuccessful").html(pointsCounter + "<i class='fas fa-check-circle'>");
    failsCounter = 0;
    $("#pointsMarkerFailed").html(failsCounter + "<i class='far fa-times-circle'>");
    progressBarValue = 0;
    $(".progress-bar").html(progressBarValue + "%");
    $(".progress-bar").css("width", progressBarValue + "%");

    /*Change Classes in cards to hide images and restart */
    $(".block").addClass("imgCard");
    $(".block").removeClass("block");
    $(".imgCard").attr("src", "");

    /*****RANDONIZE CARDS AGAIN*****/
    randomCards();
    /***** HIDE MODAL *****/
    myModal.hide();

    /***** WE CATCH LEVEL *****/
    /*****1º PROBES LEVEL SELECTION *****/
    levelUser = $("button[name=userLevel]").attr("value");
    //alert(levelUser);

    levelUser = $("button[name=userLevel]").attr("value");
    //alert(levelUser);

    levelUser = $("button[name=userLevel]").val();
    //alert(levelUser);

    /*****2º PROBES LEVEL SELECTION *****/
    if ($("input[type='radio'].btn-check").is(':checked')) {
        levelUser = $("input[type='radio'].btn-check:checked").attr("id");;
    }

    /* GO WEB TO THE BOARD TO CAN SHOW CARD VERY WELL */
    href=".board";
    href="#board";

    if (levelUser == "facil") {
        // reset(true);
        showBomb(2);

    }
    if (levelUser == "normal") {
        alert("linea 104 Estamos comporbando que entra en la comprobación de niveles, nivel: " + levelUser);

    }
    if (levelUser == "dificil") {
        alert("Estamos comporbando que entra en la comprobación de niveles, nivel: " + levelUser);

    }

    /***** CHANGE PLAY TO REPLAY *****/
    $(".playButton").html("RESTART");

}

function randomCards() {
    positions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
    let i, j, k;
    for (i = positions.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = positions[i - 1];
        positions[i - 1] = positions[j];
        positions[j] = k;
    }

    $("#" + positions[0]).data("src", "./imgs/Pikachu.png");
    $("#" + positions[1]).data("src", "./imgs/Pikachu.png");
    $("#" + positions[2]).data("src", "./imgs/Charmander.png");
    $("#" + positions[3]).data("src", "./imgs/Charmander.png");
    $("#" + positions[4]).data("src", "./imgs/Mismagius.png");
    $("#" + positions[5]).data("src", "./imgs/Mismagius.png");
    $("#" + positions[6]).data("src", "./imgs/groudon.png");
    $("#" + positions[7]).data("src", "./imgs/groudon.png");
    $("#" + positions[8]).data("src", "./imgs/Jigglypuff.png");
    $("#" + positions[9]).data("src", "./imgs/Jigglypuff.png");
    $("#" + positions[10]).data("src", "./imgs/Bulbasur.png");
    $("#" + positions[11]).data("src", "./imgs/Bulbasur.png");
    $("#" + positions[12]).data("src", "./imgs/Squirtle.png");
    $("#" + positions[13]).data("src", "./imgs/Squirtle.png");
    $("#" + positions[14]).data("src", "./imgs/bomba.png");
}

function showboard() {
    //   $(".board").fadeIn("slow");
}

function showCards() {
    $(".carta").fadeIn("slow");
}

function showBomb(tiempo) {
    tiempo = tiempo * 1000;
    flag=false;
    /*SHOW THE BOARD TO CAN SEE THE BOMB */
    
    for (var i = 0; i < positions.length; i++) {
        if ($("#" + positions[i]).data("src") == "./imgs/bomba.png") {
            //SOUND AT TURN CARD
            const music = new Audio('/audio/koffing.mp3');
            music.play();

            $("#" + positions[i]).attr("src", $("#" + positions[i]).data("src"));
            $("#" + positions[i]).fadeOut(0);
            $("#" + positions[i]).fadeIn(1000);

            cardSelected = $('#' + positions[i])[0];
            setTimeout(() => {
                cardSelected.removeAttribute("src");
                cardSelected = null;
                flag=true;
                
            }, tiempo);
        }
    }
}


function chekCard(e) {
    //Comprobamos si el flag es true
    if (flag) {
        if (e.target.className == "block") {
            alert("la carta seleccionada " + e.target.src + " ya ha sido descubierta");
            return;
        }
        console.log(e.target);
        var url = ($(e.target).data("src"));
        console.log(url);
        console.log(e.target.id);
        showCard(e.target.id);
        esBomba = url;

        //Comprobacion de la carta bomba
        if (esBomba == "./imgs/bomba.png") {
            failsCounter = failsCounter+1;
            changeInformationTitleFailPoint();
            bombcard(e.target.id);
        } else {
            if (card1SRC == null) {
                card1SRC = $(e.target).data("src");
                card1ID = e.target.id;
                cardSelected = $('#' + e.target.id)[0];//Deberia quitar el 0 pero en ese cas0 debo cambiar el resto de cardSelected.className por .addAtrribute 
                //  showCard(card1ID);
            } else {
                if (card2SRC == null) {
                    card2SRC = $(e.target).data("src");
                    card2ID = e.target.id;
                    cardSelected2 = $('#' + e.target.id)[0];
                    //   showCard(card2ID);
                    if (card1SRC == card2SRC) {
                        if (card1ID == card2ID) {
                            alert("las 2 cartas seleccionadas es la misma. Vuelve a seleccionar la 2ª carta");
                            card2SRC = null;
                            card2ID = null;
                            cardSelected2 = null;
                        } else {
                            pointsCounter = pointsCounter + 1;
                            //bloqueo las cartas
                            // $(".cardSelected.className").addClass("block");
                            cardSelected.className = "block";
                            cardSelected2.className = "block";
                            changeInformationTitleWINPoint();
                            progressBarValue += 14.3;
                            $(".progress-bar").html(progressBarValue + "%");
                            $(".progress-bar").css("width", progressBarValue + "%");
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
                                const userStore = JSON.parse(localStorage.getItem('userStore'));
                                const newUser = { userName: currentUser, fails: failsCounter };
                                userStore.push(newUser)
                                userStore.sort(function (a, b) {
                                    return a.fails - b.fails;
                                });
                                localStorage.setItem('userStore', JSON.stringify(userStore))
                                paintToPlayer()
                                //sonido ganador
                                const music = new Audio('/audio/victory.mp3');
                                music.play();
                                if (language == "ES") {
                                    informationTitle.textContent = "Excelente " + currentUser + ", has ganado los 7 puntos. El juego ha terminado";
                                }
                                if (language == "EN") {
                                    informationTitle.textContent = "Excelent " + currentUser + ", you win the 7 points. The Game is finish";
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
                        flag = false;
                        ErrorCounterAndClean();
                    }
                }

            }
        }
    }
}

function paintToPlayer() {
    $("#top-palyer-table tbody tr").remove()
    jQuery.each(JSON.parse(localStorage.getItem('userStore')).slice(0, 5), function (index, value) {
        var tr = $('<tr />');
        tr.append($('<td />', { text: value.userName }));
        tr.append($('<td />', { text: value.fails }));
        $("#top-palyer-table tbody").append(tr);
    });
}

function bombcard(e) {
    musicKoffing.play();
    $(".alert-success").removeClass("alert-primary alert-success").addClass("alert dark");
    $(".alert-danger").removeClass("alert-primary alert-danger").addClass("alert dark");
    if (language == "ES") {
        informationTitle.textContent = "BOMBA!!!, " + currentUser + " las cartas encontradas se resetearan y mantendras el contador de fallos";
    }
    if (language == "EN") {
        informationTitle.textContent = "BOMB!!!, " + currentUser + " the cards founded will be reset, and you hold the fails counter";
    }
    if (card1ID == null) {
        setTimeout(() => {
            cardSelected = $("#" + e)[0];
            cardSelected.removeAttribute("src");
        }, 1000);

    } else {
        setTimeout(() => {
            cardSelected.removeAttribute("src");
            card1ID = null;
            cardSelected = null;
            card1SRC = null;
        },1000);
    }
    if (card2ID == null) {
        setTimeout(() => {
            cardSelected = $("#" + e)[0];
            cardSelected.removeAttribute("src");
        }, 1000);

    } else {
        setTimeout(() => {
        card2SRC = null;
        card2ID = null;
        cardSelected2 = null;
        cardSelected2.removeAttribute("src");
        },1000);
    }
        //ErrorCounterAndClean();
    return;
}

function PointsCounterAndClean() {
}

function ErrorCounterAndClean() {
    var card1SRCAux = card1SRC;
    var card2SRCAux = card2SRC;
    var cardSelectedAux = cardSelected;
    var cardSelected2Aux = cardSelected2;
    var card1IDAux = card1ID;
    var card2IDAux = card2ID;

    setTimeout(() => {
        failsCounter = failsCounter + 1;
        changeInformationTitleFailPoint();
        card1SRC = null;
        card2SRC = null;
        cardSelected.removeAttribute("src");
        cardSelected2.removeAttribute("src");
        // $cardSelected2.src = "";
        cardSelected = null;
        cardSelected2 = null;
        card1ID = null;
        card2ID = null;
        flag = true;
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

    $("#" + idCarta).attr("src", $("#" + idCarta).data("src"));
    $("#" + idCarta).fadeOut(0);
    $("#" + idCarta).fadeIn(1000);
}

function cargaProducto() {
    $('#myModal').modal('show');
}



function changeInformationTitleWINPoint() {
    $(".alert-primary").removeClass("alert-primary").addClass("alert-success")
    $(".alert-danger").removeClass("alert-primary alert-danger").addClass("alert-success")
    $(".alert dark").removeClass("alert dark").addClass("alert-success")
    $(".dark").removeClass("dark").addClass("alert-success")
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

    /*****CHANGE PLAY AND RESTART BUTTON*****/
    $(".playButton").html(json.lang[language].Restart);

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