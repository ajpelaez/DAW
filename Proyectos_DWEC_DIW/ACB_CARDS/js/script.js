window.addEventListener("load", init);

const nick = document.getElementById('nick');
const cards = document.querySelectorAll(".card");
const imgs = document.querySelectorAll(".card > img");
const score = document.getElementById("score");
const info = document.getElementById("info");
const scoreLabel = document.getElementById("scoreLabel");
const errors = document.getElementById("errors");
const errorLabel = document.getElementById("errorLabel");
const langLabel = document.getElementById("langLabel");
const langEs = document.getElementById("lang-es");
const langEn = document.getElementById("lang-en");
const topNick = document.getElementById("topNick");
const topErrors = document.getElementById("topErrors");
const topLabel = document.getElementById("topLabel");
const topErrorsLabel = document.getElementById("topErrorsLabel");
const description = document.getElementById("description");
const blockInteractions = document.getElementById('blockInteractions');
let lastCard = null;
let lastImg = null;
let scoreCounter = 0;
let errorCounter = 0;

function init() {
    while (nick.innerHTML == "") {
        nick.innerHTML = prompt("Introduce tu nombre:");
    }

    cards.forEach(element => {
        element.addEventListener("click", flip);
    });

    langEs.addEventListener("click", () => {
        localStorage.setItem("lang", "es");
        language();
    });
    langEn.addEventListener("click", () => {
        localStorage.setItem("lang", "en");
        language();
    });

    localStorage.setItem("nick", nick.innerHTML);
    if (localStorage.getItem("lang") == null) {
        localStorage.setItem("lang", "es");
    }

    language();
    randomize();
    updateTop();
}

function flip() {
    currentImg = this.querySelector("img");
    if (lastImg == null) {
        lastImg = currentImg;
        lastCard = this;
        lastCard.classList.replace('down', 'up');
        this.classList.replace('down', 'up');
        currentImg.classList.replace('hidden', 'selected');
    } else {
        if (lastImg != currentImg) {
            if (lastImg.src == currentImg.src) {
                scoreCounter++;
                score.value = scoreCounter;
                this.classList.replace('down', 'up');
                currentImg.classList.replace('hidden', 'match');
                lastImg.classList.replace('selected', 'match');
                lastCard.removeEventListener("click", flip);
                this.removeEventListener("click", flip);
                inform("match");
                if (scoreCounter == 6) {
                    inform("win");
                    setTimeout(() => {
                        updateTop();
                        reset();
                    }, 2000);
                }
                lastImg = null;
            } else {
                blockInteractions.style.display = "block";
                this.classList.replace('down', 'up');
                currentImg.classList.replace('hidden', 'error');
                lastImg.classList.replace('selected', 'error');
                inform("fail");
                setTimeout(() => {
                    errorCounter++;
                    errors.value = errorCounter;
                    this.classList.replace('up', 'down');
                    lastCard.classList.replace('up', 'down');
                    currentImg.classList.replace('error', 'hidden');
                    lastImg.classList.replace('error', 'hidden');
                    lastImg = null;
                    blockInteractions.style.display = "none";
                }, 1000);
            }
        }
    }
}

function randomize() {
    let sources = new Array();
    let i = 0;
    imgs.forEach(element => {
        sources.push(element.src);
    });
    sources = sources.sort((a, b) => 0.5 - Math.random());
    imgs.forEach(element => {
        element.setAttribute('draggable', false);
        element.src = sources[i];
        i++;
    });
}

function reset() {
    scoreCounter = 0;
    errorCounter = 0;
    score.value = scoreCounter;
    errors.value = errorCounter;
    cards.forEach(element => {
        element.classList.replace('up', 'down');
        element.addEventListener("click", flip);
    });
    imgs.forEach(element => {
        element.classList.replace('match', 'hidden');
    });
    randomize();
}

function language() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            changeLanguage(this);
        }
    };
    xhr.open("GET", "js/lang/lang.json", true);
    xhr.send();
}

function changeLanguage(xhr) {
    let json = JSON.parse(xhr.responseText);
    let lang = (localStorage.getItem("lang") != null) ? localStorage.getItem("lang") : "en";
    langLabel.innerHTML = json[lang]['LangLabel'];
    scoreLabel.innerHTML = json[lang]['Score'];
    errorLabel.innerHTML = json[lang]['ErrorLabel'];
    topErrorsLabel.innerHTML = json[lang]['Score'];
    topLabel.innerHTML = json[lang]['TopLabel'];
    info.innerHTML = json[lang]['Info'];
    description.innerHTML = json[lang]['Description'];
    document.title = json[lang]['Title'];
}

function updateTop() {
    if (scoreCounter == 6) {
        if (localStorage.getItem("topErrors") != null) {
            if (errorCounter < Number(localStorage.getItem("topErrors"))) {
                localStorage.setItem("topNick", nick.innerHTML);
                localStorage.setItem("topErrors", errorCounter);
                inform("record");
            }
        } else {
            localStorage.setItem("topNick", nick.innerHTML);
            localStorage.setItem("topErrors", errorCounter);
            inform("record");
        }
    }
    if (localStorage.getItem("topNick") != null && localStorage.getItem("topErrors") != null) {
        topNick.value = localStorage.getItem("topNick");
        topErrors.value = localStorage.getItem("topErrors");
    }
}

function inform(msg) {
    if (msg == "win") {
        if (localStorage.getItem("lang") == "es") {
            info.innerHTML = "Has ganado con " + errorCounter + " fallos!";
        } else {
            info.innerHTML = "You won with " + errorCounter + " mistakes!";
        }
    }
    if (msg == "fail") {
        if (localStorage.getItem("lang") == "es") {
            info.innerHTML = "Cartas incorrectas!";
        } else {
            info.innerHTML = "Incorrect cards!";
        }
    }
    if (msg == "match") {
        if (localStorage.getItem("lang") == "es") {
            info.innerHTML = "Has acertado!";
        } else {
            info.innerHTML = "Good match!";
        }
    }
    if (msg == "record") {
        if (localStorage.getItem("lang") == "es") {
            info.innerHTML = "Buena jugada! Has marcado un nuevo récord con " + errorCounter + " fallos!";
        } else {
            info.innerHTML = "Good game! You set a new record with " + errorCounter + " mistakes!";
        }
    }
}