//Chek if the browser supports Web Storage
if (typeof (Storage) !== "undefined") {
            /*          alert("El navegador soporta WebStorage");
                        if (localStorage.usuario != null) {
                            document.getElementById("saludo").innerHTML = "¡Bienvenido/a de nuevo, " + localStorage.usuario + "!";
                        } else {
                            localStorage.setItem("puntos", pointsCounter);
                            document.getElementById("saludo").innerHTML = "¡Tu primera visita, " + localStorage.usuario + "!";
                        }
            
                        if (!sessionStorage.getItem("contador"))
                            sessionStorage.setItem("contador", "0");
            
                        document.getElementById("contador").innerHTML = "Contador: " + sessionStorage.getItem("contador");
                        document.getElementById("incrementar").addEventListener("click", incrementar);
                        document.getElementById("decrementar").addEventListener("click", decrementar);
                        document.getElementById("logout").addEventListener("click", logout);
                    */       }

else {//Hold the message about the browser don´t support Web Storage, because it´s necesary to run correctly
    alert("El navegador no soporta Web Storage");

}

/*          function incrementar() {
                     sessionStorage.setItem("contador", Number(sessionStorage.getItem("contador")) + 1);
                     document.getElementById("contador").innerHTML = "Contador: " + sessionStorage.getItem("contador");
                 }
                 function decrementar() {
                     sessionStorage.setItem("contador", Number(sessionStorage.getItem("contador")) - 1);
                     document.getElementById("contador").innerHTML = "Contador: " + sessionStorage.getItem("contador");
    }*/
function logout() {
    alert("Se ha cerrado la sesión de " + localStorage.getItem("usuario"));
    localStorage.removeItem("usuario");
    //sessionStorage.clear();
    document.getElementById("saludo").innerHTML = "";
}


window.addEventListener("load", start, false)
/*VARIABLES ABOUT POINTS*/
let pointsCounter = 0;
let failsCounter = 0;
var ranking;

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
    let cartas = document.getElementsByClassName("carta");


    if (cartas.length > 0) {
        for (i = 0; i < cartas.length; i++) {
            cartas[i].addEventListener("click", chekCard, false);
        }
    }
}


let userName = prompt("Escribe tu Usuario");
if (userName != "") {
    nick.innerHTML = "" + userName;
} else {
    nick.innerHTML = "NO NAME USER";
}
function randomCards() {
    let posiciones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",];
    let i, j, k;
    for (i = posiciones.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = posiciones[i - 1];
        posiciones[i - 1] = posiciones[j];
        posiciones[j] = k;
    }

    document.getElementById(posiciones[0]).src = "./imgs/Pikachu.png";
    document.getElementById(posiciones[1]).src = "./imgs/Pikachu.png";
    document.getElementById(posiciones[2]).src = "./imgs/Charizard.png";
    document.getElementById(posiciones[3]).src = "./imgs/Charizard.png";
    document.getElementById(posiciones[4]).src = "./imgs/mewtwo.png";
    document.getElementById(posiciones[5]).src = "./imgs/mewtwo.png";
    document.getElementById(posiciones[6]).src = "./imgs/groudon.png";
    document.getElementById(posiciones[7]).src = "./imgs/groudon.png";
    document.getElementById(posiciones[8]).src = "./imgs/eevee.png";
    document.getElementById(posiciones[9]).src = "./imgs/eevee.png";
    document.getElementById(posiciones[10]).src = "./imgs/digglet.png";
    document.getElementById(posiciones[11]).src = "./imgs/digglet.png";
}


function chekCard(e) {
    if (e.target.className == "block") {
        alert("la carta seleccionada " + e + " ya ha sido descubierta");
        return;
    }
    if (card1SRC == null) {
        card1SRC = e.target.src;
        card1ID = e.target.id;
        cardSelected = document.getElementById(e.target.id);
        showCard(cardSelected);
    } else {
        if (card2SRC == null) {
            card2SRC = e.target.src;
            card2ID = e.target.id;
            cardSelected2 = document.getElementById(e.target.id);
            showCard(cardSelected2);
            if (card1SRC == card2SRC) {
                if (card1ID == card2ID) {
                    alert("las 2 cartas seleccionadas es la misma. Vuelve a seleccionar la 2ª carta");
                    card2SRC = null;
                } else {
                    pointsCounter = pointsCounter + 1;
                    cardSelected.className = "block";
                    cardSelected2.className = "block";
                    changeInformationTitleWINPoint();
                    {
                        cartasDescubiertas += new Array(card1ID);
                        cartasDescubiertas += new Array(card2ID);
                    }
                    if (pointsCounter == 6) {
                        let information = document.getElementById("information");
                        if (localStorage.getItem("fails") == null || failsCounter < localStorage.getItem("fails")) {
                            localStorage.setItem("topName", userName);//create o modify the value topName of the WebStorage
                            localStorage.setItem("score", pointsCounter);//create o modify the value score of the WebStorage
                            localStorage.setItem("fails", failsCounter);//create o modify the value fails of the WebStorage
                        }
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
                failsCounter = failsCounter + 1;
                changeInformationTitleFailPoint();
                setTimeout(() => {
                    cardSelected.style.opacity = 0;
                    cardSelected2.style.opacity = 0;
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

function showAlert(message) {
    setTimeout(() => {
        alert(message);
    }, 500);
}

function showCard(idCarta) {
    idCarta.style.opacity = 1;
}

function changeInformationTitleWINPoint() {
    localStorage.setItem("puntos", pointsCounter);
    if (language == "ES") {
        if (pointsCounter != 0) {
            showAlert
            informationTitle.textContent = "Has ganado un punto, ahora tienes: " + pointsCounter;
            localStorage.setItem("language", "EN");//create o modify the value of the WebStorage
        }
        pointsMarkerSuccessful.innerHTML = pointsCounter + "<i class='fas fa-check-circle'>";
    }
    else if (language == "EN") {
        if (pointsCounter != 0) {
            informationTitle.innerHTML = "You Win 1 Point, now you have: " + pointsCounter;
        }
        pointsMarkerSuccessful.innerHTML = pointsCounter + "<i class='fas fa-check-circle'>";

    }
}

function changeInformationTitleFailPoint() {
    if (language == "ES") {
        pointsMarkerFailed.innerHTML = failsCounter + "<i class='far fa-times-circle'>";
        if (failsCounter != 0) {
            informationTitle.innerHTML = "Has fallado, tienes: " + failsCounter + " fallos.";
        }

    } if (language == "EN") {
        pointsMarkerFailed.innerHTML = failsCounter + "<i class='far fa-times-circle'>";
        if (failsCounter != 0) {
            informationTitle.innerHTML = "You fail, you have: " + failsCounter + " faults.";
        }

    }

}

function ranking() {
    primero = document.getElementById("primerPuesto");
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

function importXML(xml) {
    let docXML = xml.responseXML;
    let languageImportXML = docXML.getElementsByTagName(localStorage.getItem("language"));
    mainTitle.innerHTML = (languageImportXML[0].getElementsByTagName("MAINTITLE")[0].textContent);
    scoreTitle.innerHTML = (languageImportXML[0].getElementsByTagName("SCORE")[0].textContent);
    errorsTitle.innerHTML = (languageImportXML[0].getElementsByTagName("ERRORS")[0].textContent);
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
    mainTitle.innerHTML = json.lang[language].MainTitle;
    /*CHANGE SCORE BOX*/
    scoreTitle.innerHTML = json.lang[language].Score;
    errorsTitle.innerHTML = json.lang[language].Errors;
    /*  pointsMarkerSuccessful.innerHTML = pointsCounter + "<i class='fas fa-check-circle'>";
      pointsMarkerFailed.innerHTML = failsCounter + "<i class='far fa-times-circle'>";*/
    /*CHANGE TOP PLAYER BOX*/
    menuTopPlayerTitle.innerHTML = json.lang[language].TopPlayer;
    topPointsTitle.innerHTML = json.lang[language].Fails;
    menuTopPlayer.innerHTML = localStorage.getItem("topName");
    topPoints.innerHTML = localStorage.getItem("fails");
    /*CHANGE LANGUAGE BOX*/
    languageTitle.innerHTML = json.lang[language].Language;
    /*I comment this line for to change Cookie for WebStorage  
    setCookie("language", "EN", 3);*/
    localStorage.setItem("language", language);//create o modify the value of the WebStorage
    /*INFORMATION BOX*/
    let infomationAlert = " ";
    informationTitle.innerHTML = infomationAlert;
}


function putInEnglish() {
    language = "EN";
    /*CHANGE MAIN TITLE*/
    mainTitle.innerHTML = "Exercise Card Game";
    /*CHANGE SCORE BOX*/
    scoreTitle.innerHTML = "SCORE";
    errorsTitle.innerHTML = "ERRORS";
    pointsMarkerSuccessful.innerHTML = pointsCounter + "<i class='fas fa-check-circle'>";
    pointsMarkerFailed.innerHTML = failsCounter + "<i class='far fa-times-circle'>";
    /*CHANGE TOP PLAYER BOX*/
    menuTopPlayerTitle.innerHTML = "TOP PLAYER";
    topPointsTitle.innerHTML = "FAILS";
    menuTopPlayer.innerHTML = localStorage.getItem("topName");
    topPoints.innerHTML = localStorage.getItem("fails");
    /*CHANGE LANGUAGE BOX*/
    languageTitle.innerHTML = "LANGUAGE";
    /*I comment this line for to change Cookie for WebStorage  
    setCookie("language", "EN", 3);*/
    localStorage.setItem("language", "EN");//create o modify the value of the WebStorage
    /*INFORMATION BOX*/
    let infomationAlert = " ";
    informationTitle.innerHTML = infomationAlert;

    changeInformationTitleWINPoint();
    changeInformationTitleFailPoint();
    languageChangeJSON();
}

function putInSpanish() {
    language = "ES";
    /*CHANGE MAIN TITLE*/
    mainTitle.innerHTML = "Ejercicio Juego de Cartas ";

    /*CHANGE BOX ABOUT POINTS*/

    scoreTitle.innerHTML = "PUNTOS";
    errorsTitle.innerHTML = "FALLOS";
    pointsMarkerSuccessful.innerHTML = pointsCounter + "<i class='fas fa-check-circle'>";
    pointsMarkerFailed.innerHTML = failsCounter + "<i class='far fa-times-circle'>";

    /*CHANGE BOX ABOUT TOP PLAYER*/
    menuTopPlayerTitle.innerHTML = "MEJOR JUGADORA";
    topPointsTitle.innerHTML = "FALLOS";
    menuTopPlayer.innerHTML = localStorage.getItem("topName");
    topPoints.innerHTML = localStorage.getItem("fails");

    /*CHANGE LANGUAGE BOX*/
    languageTitle.innerHTML = "IDIOMA";
    /*Comento esta linea para cambiar el uso de cookies por web Storage  
   setCookie("language", "ES", 3);*/
    localStorage.setItem("language", "ES");//crea o modifica el valor de Web Storage

    changeInformationTitleWINPoint();
    changeInformationTitleFailPoint();
    languageChangeJSON();
}


/* ESTO ERA LA UTILIDAD DE LAS COOKIES, pero lo comentamos para cambiarlo por web Storage
 function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }*/

/*  ESTO ERA LA UTILIDAD DE LAS COOKIES, pero lo comentamos para cambiarlo por web Storage
function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }*/