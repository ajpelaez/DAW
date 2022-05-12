//$(".imgCard").css('background-color', 'transparent');



//Chek if the browser supports Web Storage
if (typeof (Storage) !== "undefined") {
}

else {//Hold the message about the browser don´t support Web Storage, because it´s necesary to run correctly
    alert("El navegador no soporta Web Storage");

}

//$(window)('load', start, false);
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
const musicJigglypuffShort = new Audio('../audio/jigglypuffShort.mp3');
const musicBulbasur = new Audio('../audio/bulbasur.mp3');
const musicMismagius = new Audio('../audio/mismagius.mp3');
const musicGroudon = new Audio('../audio/groudon.mp3');

function start() {  //Restart counter to 0
    hideCards(2);
    /*****Lenguage By Default ES if we doesn´t Lenguage in LocalStorage *****/
    if (!localStorage.getItem("language")) localStorage.setItem('language', 'ES')
    if (!localStorage.getItem("userStore")) localStorage.setItem('userStore', JSON.stringify(defaultUsers))
    /***** I need the var language for other parts and to change language in all the game*****/
    language = localStorage.getItem("language");
    languageChangeJSON();
    paintTopPlayers()
    /*****Modal Start*****/
    myModal = new bootstrap.Modal($('#initModal'))
    myModal.show();
    let cartasDescubiertas = new Array;
    let cartasDescubiertasSI = 0;
    $('.carta').click(chekCard);
}


function play() {
    /*****We catch the currentUser and we put on the class Nick*****/
    currentUser = $("#userName").val();
    $("#nick2").html("" + currentUser);

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

    /* WE CHECK TE LEVEL SELECTED AN APPLY LEVEL PERSONALIZATION*/
    if (levelUser == "facil") {
        // reset(true);
        showCards(3000);
        $("#showCards").removeClass("d-none");
    }
    if (levelUser == "normal") {
        showBomb(3);
        $("#showCards").addClass("d-none");

    }
    if (levelUser == "dificil") {
        $("#showCards").addClass("d-none");
    }

    if (levelUser == "leyenda") {
        showBomb(1);
        $("#showCards").addClass("d-none");
    }

    if (levelUser == null) {
     //   console.log("ESTOY ENTRANDO A COMPROBAR EL NIVEL POR EL ACORDEON");
        /*****3º TEST LEVEL SELECTION ACCORDION *****/
        if ($("#accordionLevel").is(':checked')) {
            levelUser = $("#accordionLevel").attr("id");;
           // console.log(levelUser);
        }

        /* WE CHECK TE LEVEL SELECTED AN APPLY LEVEL PERSONALIZATION*/
        if (levelUser == "facil") {
            // reset(true);
            $("#showCards").removeClass("d-none");
        }
        if (levelUser == "normal") {
            showBomb(5000);
            $("#showCards").addClass("d-none");

        }
        if (levelUser == "dificil") {
            $("#showCards").addClass("d-none");
        }

        if (levelUser == "leyenda") {
            showBomb(2);
            $("#showCards").addClass("d-none");
        }
    }
    /***** WE PUT currentUser and Level in the webpage *****/
    $("#nick").html("" + currentUser + ", Level: " + levelUser);
    $("#level").html("" + levelUser);

    shareCards();
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

function shareCards(tiempo) {
    //  tiempo = tiempo * 1000;
    flag = false;
    /*SHARE THE CARDS */
    var fadeInTime = 100;
    setTimeout(() => {
        for (var i = 0; i <= 15; i++) {
            $(".carta" + positions[i]).fadeIn(fadeInTime);
            fadeInTime += 100;
        }
    }, 500);

    if (levelUser == "facil") {
        putBackgroundPokeball(3000);
    }
    if (levelUser == "normal") {
        putBackgroundPokeball(3000);

    }
    if (levelUser == "dificil") {
        putBackgroundPokeball(0);
    }

    if (levelUser == "leyenda") {
        putBackgroundPokeball(2000);
    }

    flag = true;
}

function putBackgroundPokeball(tiempo){
    setTimeout(() => {
        for (var i = 0; i <= 15; i++) {
            $("#"+i).attr("src","imgs/pokeball.jpg");
        }
    }, tiempo);
}

function hideCards(tiempo) {
    flag = false;
    /*SHARE THE CARDS */
    // var fadeOutTime = 200;

     setTimeout(() => {
          for (var i = 0; i <= 15; i++) {
              $(".carta"+i).fadeOut(200);
          }
      }, 500);
}

function chekCard(e) {
    //Comprobamos si el flag es true
    if (flag) {
        if (e.target.className == "block") {
            alert("la carta seleccionada " + e.target.src + " ya ha sido descubierta");
            return;
        }
      //  console.log(e.target);
        var url = ($(e.target).data("src"));
     //   console.log(url);
     //   console.log(e.target.id);
        showCard(e.target.id);
        esBomba = url;

        //Comprobacion de la carta bomba
        if (esBomba == "./imgs/bomba.png") {
            /*QUITAR TODAS LAS CARTAS BLOQUEADAS y PONER CONTADOR DE PUNTOS A 0 */
            $(".block").addClass("imgCard");
            $(".block").removeAttr("src");
            $(".block").removeClass("block");
            pointsCounter = 0;
            changeInformationTitleWINPoint();
            failsCounter = failsCounter + 1;
            changeInformationTitleFailPoint();
            progressBarValue =0;
            $(".progress-bar").html(progressBarValue + "%");
            $(".progress-bar").css("width", progressBarValue + "%");
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
                            reproduceCardSound(card1SRC);
                            {
                                cartasDescubiertas += new Array(card1ID);
                                cartasDescubiertas += new Array(card2ID);
                            }
                            if (pointsCounter == 7) {
                                //cambiar clase de la caja cuando ganas a alert-warning
                                $(".alert-success").removeClass("alert-primary alert-success").addClass("alert-warning")
                                $(".alert-danger").removeClass("alert-primary alert-danger").addClass("alert-warning")
                                let information = $('#information');
                                /* I GET ALL THE  SAVED userStore, it´s like userRanking */
                                const userStore = JSON.parse(localStorage.getItem('userStore'));
                                const newUser = { userName: currentUser, fails: failsCounter };
                                userStore.push(newUser)
                                userStore.sort(function (a, b) {
                                    return a.fails - b.fails;
                                });
                                localStorage.setItem('userStore', JSON.stringify(userStore))
                                paintTopPlayers()
                                //sonido ganador
                                const music = new Audio('/audio/pokemon.mp3');
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
                        }
                    } else {
                        ErrorCounterAndClean();
                        flag = false;
                    }
                }

            }
        }
    }
}

function paintTopPlayers() {
    $("#top-palyer-table tbody tr").remove()
    var i;
    jQuery.each(JSON.parse(localStorage.getItem('userStore')).slice(0, 15), function (index, value) {
        i++;
        var tr = $('<tr />');
        tr.append($('<td />', { text: value.userName }));
        tr.append($('<td />', { text: value.fails }));
        $("#top-palyer-table tbody").append(tr);
    });
}

function showCards(tiempo) {
    //  tiempo = tiempo * 1000;
    flag = false;
    /*SHOW THE BOARD TO CAN SEE THE BOMB */

    for (var i = 0; i < positions.length; i++) {
        $("#" + positions[i]).attr("src", $("#" + positions[i]).data("src"));
    }
    setTimeout(() => {
        for (var j = 0; j <= positions.length; j++) {
            if ($("#" + j).hasClass("block")) {
                //SI ESTA BLOQUEADO NO HACE NADA
            } else {
                $("#" + j).removeAttr("src");
            }
        }
    }, tiempo);
    flag = true;
    $("#showCards").fadeOut(2000);
}

function showBomb(tiempo) {
    tiempo = tiempo * 1000;
    flag = false;
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
                console.log("AQUI QUITAMOS EL ATRIBUTO SRC A LA BOMBA");
              //  cardSelected.removeAttribute("src");
                cardSelected = null;
                flag = true;
            }, tiempo);
        }
    }
}

function bombcard(e) {
    flag = false;
    musicKoffing.play();

    console.log("estalló en la bomba");
    $(".alert-success").removeClass("alert-primary alert-success").addClass("alert-warning");
    $(".alert-danger").removeClass("alert-primary alert-danger").addClass("alert-warning");
    if (language == "ES") {
        informationTitle.textContent = "BOMBA!!!, tienes 1 fallo más";
    }
    if (language == "EN") {
        informationTitle.textContent = "BOMB!!!, you have 1 fail more";
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
    
        }, 1000);
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
        }, 1000);
        flag=true;
    }

    setTimeout(() =>{
        $(".imgCard").attr("src","imgs/pokeball.jpg");
        flag = true;
    },1000);
    
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
        /*WHEN WE HAVE LEYEND LEVEL, THE USER ONLY CAN HAVE 2 FAILS" */
        if (levelUser == "leyenda" && failsCounter == 2) {
            alert("YA TIENES 2 FALLOS, EL JUEGO SE REINICIARÁ");
            start();
        }
        changeInformationTitleFailPoint();
        card1SRC = null;
        card2SRC = null;
        cardSelected.removeAttribute("src");
        console.log(cardSelected.id);
       $("#"+cardSelected.id).attr("src","imgs/pokeball.jpg");
        cardSelected2.removeAttribute("src");
        $("#"+cardSelected2.id).attr("src","imgs/pokeball.jpg");

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

function reproduceCardSound(pokemonRecived) {
  //  console.log(pokemonRecived);
    switch (pokemonRecived) {
        case "./imgs/Pikachu.png":
            musicPikachu.play();
            break;
        case "./imgs/Squirtle.png":
            musicSquirtle.play();
            break;
        case "./imgs/Charmander.png":
            musicCharmander.play();
            break;
        case "./imgs/Bulbasur.png":
            musicBulbasur.play();
            break;
        case "./imgs/Mismagius.png":
            musicMismagius.play();
            break;
        case "./imgs/Jigglypuff.png":
            musicJigglypuffShort.play();
            break;
        case "./imgs/groudon.png":
            musicGroudon.play();
            break;
        case "./imgs/Bulbasur.png":
            musicBulbasur.play();
            break;
    }
}

function changeInformationTitleWINPoint() {
    $(".alert-primary").removeClass("alert-primary").addClass("alert-success")
    $(".alert-danger").removeClass("alert-primary alert-danger").addClass("alert-success")
    $(".alert-warning").removeClass("alert-warning").addClass("alert-success")
    $(".dark").removeClass("dark").addClass("alert-success")
    if (language == "ES") {
        $("#informationTitle").html("Has ganado un punto, tienes: " + pointsCounter);
        $("#pointsMarkerSuccessful").html(pointsCounter + "<i class='fas fa-check-circle'>");
    }
    else if (language == "EN") {
        $("#informationTitle").html("You Win 1 Point, you have: " + pointsCounter);
        $("#pointsMarkerSuccessful").html(pointsCounter + "<i class='fas fa-check-circle'>");
    }
}

function changeInformationTitleFailPoint() {
    $(".alert-primary").removeClass("alert-primary").addClass("alert-danger")
    $(".alert-success").removeClass("alert-success").addClass("alert-danger")
    $(".alert-warning").removeClass("alert-warning").addClass("alert-danger")
    if (language == "ES") {
        $("#informationTitle").html("Fallaste, tienes: " + failsCounter + " fallos.");
        $("#pointsMarkerFailed").html(failsCounter + "<i class='far fa-times-circle'>");
    }
    if (language == "EN") {
        $("#informationTitle").html("You fail, you have: " + failsCounter + " fails.");
        $("#pointsMarkerFailed").html(failsCounter + "<i class='far fa-times-circle'>");
    }
}

function ranking() {
    primero = $('#primerPuesto')
    primero.innerHTML = "El usuario que ha conseguido mayor puntuación a sido = " + userName;
}

function putInEnglish() {
    language = "EN";
    localStorage.setItem("language", "EN");//create o modify the value of the WebStorage
    languageChangeJSON();
}

function putInSpanish() {
    language = "ES";
    localStorage.setItem("language", "ES");//crea o modifica el valor de Web Storage
    languageChangeJSON();
}



function languageChangeJSON() {
    let language = localStorage.getItem("language");
    /*****CHANGE LANGUAGE IN MAINMENU*****/
    /*****CHANGE LANGUAGE IN OPTIONS MENU*****/
    $.getJSON("lang/lang.json", function (json){
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

        /*INFORMATION BOX*/
        let infomationAlert = "";
        //informationTitle.innerHTML = infomationAlert;
        $("#informationTitle").html("" + json.lang[language].informationAlert);

        /*CHANGE SCORE BOX*/
        $("#scoreTitle").html(json.lang[language].Score);
        $("#errorsTitle").html(json.lang[language].Errors);
        /*CHANGE TOP PLAYER BOX*/
        $("#menuTopPlayerTitle").html(json.lang[language].TopPlayer);
        $("#topPointsTitle").html(json.lang[language].Fails);
        $("#menuTopPlayer").html(localStorage.getItem("topName"));
        $("#topPoints").html(localStorage.getItem("fails"));

        /*CHANGE SHOW CARDS*/
        $(".showCards").html("" + json.lang[language].ShowCards);
        localStorage.setItem("language", language);//create o modify the value of the WebStorage

        /*CHANGE MODAL CONTENT */
        $("#configuration").html(json.lang[language].Configuration);
        $("#userName").html(json.lang[language].YourName);
        $(".facil").html(json.lang[language].Easy);
        $(".normal").html(json.lang[language].Medium);
        $(".dificil").html(json.lang[language].Advanced);
        $(".leyenda").html(json.lang[language].Leyend);
        $("#pulseHereToStart").html(json.lang[language].PulseHereToStart);
    });
}
