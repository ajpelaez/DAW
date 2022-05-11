window.addEventListener("load", init);

const nick = document.getElementById('nick');
const cards = document.querySelectorAll(".carta");
const imgs = document.querySelectorAll(".carta > img");
const langEs = document.getElementById("ES");
const langEn = document.getElementById("EN");
var lastCard = null;
var lastImg = null;
var scoreCounter = 0;
var errorCounter = 0;

var blockInteractions = document.getElementById('blockInteractions');

function init() {
    while (nick.innerHTML == "" || nick.innerHTML == "Nick") {
        nick.innerHTML = prompt("Dime tu nombre:");
    }
    localStorage.setItem("nick", nick.innerHTML);

    cards.forEach(element => {
        element.addEventListener("click", flip);
    });
    if (localStorage.getItem("lang") == null) {
        localStorage.setItem("lang", "ES");
    }
    langEs.addEventListener("click", () => {
        localStorage.setItem("lang", "ES");
        changeLang();
    });
    langEn.addEventListener("click", () => {
        localStorage.setItem("lang", "EN");
        changeLang();
    });

    changeLang();
    updateTop();
    randomCards();

}

function flip() {
    currentImg = this.querySelector("img");
    if (lastImg == null) {
        lastImg = currentImg;
        lastCard = this;
        console.log(lastCard,currentImg);
        lastCard.style.backgroundImage = "url()";
        currentImg.style.display = "block";
        console.log(lastCard,currentImg);
    } else {
        if (lastImg != currentImg) {
            if (lastImg.src == currentImg.src) {
                this.style.backgroundImage = "url()";
                currentImg.style.display = "block";
                scoreCounter++;
                scoreNum.innerHTML = scoreCounter;
                lastCard.removeEventListener("click", flip);
                inform("match");
                this.removeEventListener("click", flip);
                if (scoreCounter == 6) {
                    setTimeout(() => {
                        inform("win");
                        updateTop();
                        reset();
                    }, 500);
                }
                lastImg = null;
            } else {
                blockInteractions.style.display = "block";
                this.style.backgroundImage = "url()";
                currentImg.style.display = "block";
                inform("fail");
                setTimeout(() => {
                    this.style.backgroundImage = "url(imgs/carta.jpg)";
                    lastCard.style.backgroundImage = "url(imgs/carta.jpg)";
                    currentImg.style.display = "none";
                    lastImg.style.display = "none";
                    errorCounter++;
                    errorNum.innerHTML = errorCounter;
                    lastImg = null;
                    blockInteractions.style.display = "none";
                }, 1000);
            }
        }
    }
}

function randomCards() {
    let sources = new Array();
    let i = 0;
    imgs.forEach(element => {
        sources.push(element.src);
    });
    sources = sources.sort((a, b) => 0.5 - Math.random());
    imgs.forEach(element => {
        element.src = sources[i];
        i++;
    });
}

function reset() {
    scoreCounter = 0;
    errorCounter = 0;
    scoreNum.innerHTML = scoreCounter;
    errorNum.innerHTML = errorCounter;
    cards.forEach(element => {
        element.style.backgroundImage = "url(imgs/carta.jpg)";
        element.addEventListener("click", flip);
    });
    imgs.forEach(element => {
        element.style.display = "none";
    });
    randomCards();
}
function inform(msg) {
    if (msg == "win") {
        if (localStorage.getItem("lang") == "ES") {
            info.innerHTML = "Has ganado: " + errorCounter + " fallos!!";
        } else {
            info.innerHTML = "You win: " + errorCounter + " mistakes!!";
        }
    }
    if (msg == "fail") {
        if (localStorage.getItem("lang") == "ES") {
            info.innerHTML = "Prueba otra vez!";
        } else {
            info.innerHTML = "Try again!";
        }
    }
    if (msg == "match") {
        if (localStorage.getItem("lang") == "ES") {
            info.innerHTML = "Has acertado!";
        } else {
            info.innerHTML = "You're right!";
        }
    }
    if (msg == "record") {
        if (localStorage.getItem("lang") == "ES") {
            info.innerHTML = "Bien jugado! El nuevo record es: " + errorCounter + " fallos!";
        } else {
            info.innerHTML = "Good game! The new record is: " + errorCounter + " mistakes!";
        }
    }
}
function updateTop() {
    if (scoreCounter == 6) {
        if (localStorage.getItem("topErr") != null) {
            if (errorCounter < Number(localStorage.getItem("topErr"))) {
                localStorage.setItem("topPlayer", nick.innerHTML);
                localStorage.setItem("topErr", errorCounter);
                inform("record");
            }
        } else {
            localStorage.setItem("topPlayer", nick.innerHTML);
            localStorage.setItem("topErr", errorCounter);
            inform("record");
        }
    }
    if (localStorage.getItem("topPlayer") != null && localStorage.getItem("topErr") != null) {
        topPlayerNick.innerHTML = localStorage.getItem("topPlayer");
        topPlayerErr.innerHTML = localStorage.getItem("topErr");
    }
}

// Cambiar Idioma con Json

function changeLang() {
    var xmlhttp = new XMLHttpRequest();
    var url = "lang/lang.json";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            importJson(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function importJson(arr) {
    let idioma = localStorage.getItem("lang");
    title.innerHTML = arr.lang[idioma].title;
    score.innerHTML = arr.lang[idioma].score;
    description.innerHTML = arr.lang[idioma].description;
    error.innerHTML = arr.lang[idioma].error;
    topErrors.innerHTML = arr.lang[idioma].error;
    topPlayer.innerHTML = arr.lang[idioma].topp;
    language.innerHTML = arr.lang[idioma].language;
    footer.innerHTML = arr.lang[idioma].footer;
}