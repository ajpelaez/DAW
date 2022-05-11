$(document).ready(init);

var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
});

const nick = $("#nick");
const cards = $(".carta");
const imgs = $(".carta > img");
const langEs = $("#ES");
const langEn = $("#EN");
var lastCard = null;
var lastImg = null;
var scoreCounter = 0;
var errorCounter = 0;
var blockInteractions = $("#blockInteractions");
var bomba = null;
var currentImg = null;
var lastImg = null;
var lastCard = null;
var dificultad = null;
var progreso = null;
let sources = new Array(
    "imgs/carta1.png",
    "imgs/carta1.png",
    "imgs/carta2.png",
    "imgs/carta2.png",
    "imgs/carta3.png",
    "imgs/carta3.png",
    "imgs/carta4.png",
    "imgs/carta4.png",
    "imgs/carta5.png",
    "imgs/carta5.png",
    "imgs/carta6.png",
    "imgs/carta6.png",
    "imgs/carta7.png",
    "imgs/carta7.png",
    "imgs/bomba.png"
);
let sources2 = new Array(
    "imgs/carta3.png",
    "imgs/carta3.png",
    "imgs/carta3.png",
    "imgs/carta6.png",
    "imgs/carta6.png",
    "imgs/carta6.png",
    "imgs/carta6.png",
    "imgs/carta6.png",
    "imgs/carta6.png",
    "imgs/carta6.png",
    "imgs/carta6.png",
    "imgs/carta6.png",
    "imgs/carta6.png",
    "imgs/carta6.png",
    "imgs/carta6.png",
);

const NO_OF_HIGH_SCORES = 5;
const HIGH_SCORES = 'highScores';
const highScoreString = localStorage.getItem(HIGH_SCORES);
var highScores = JSON.parse(highScoreString) ?? [];
var lowestScore = highScores[5]?.score ?? 1000;
var players = [{ "name": "player", "score": 10 }, { "name": "player", "score": 20 }, { "name": "player", "score": 40 }, { "name": "player", "score": 60 }, { "name": "player", "score": 80 }];



function init() {
    preload(sources);
    showHighScores();

    if (localStorage.getItem("lang") == null) {
        localStorage.setItem("lang", "ES");
    }

    langEs.click(function () {
        localStorage.setItem("lang", "ES");
        changeLang();
    });

    langEn.click(function () {
        localStorage.setItem("lang", "EN");
        changeLang();
    });
    changeLang();

}
$("#play").on("click", function () {
    var getNick = $("#getNick").val();
    if (getNick != "") {
        nick.html(getNick);
        localStorage.setItem("nick", getNick);
        if ($("input[type='radio'].btn-check").is(':checked')) {
            dificultad = $("input[type='radio'].btn-check:checked").attr("id");;
        }
        if (dificultad == "facil") {
            reset(true);
            mostrarbomba(2);
            $(".btnPista").removeClass("d-none");
            $("#btnPista").one("click", pista);
        }
        if (dificultad == "normal") {
            reset(true);
            mostrarbomba(2);
        }
        if (dificultad == "dificil") {
            reset(true);
            mostrarbomba(0);
        }
        if (dificultad == "leyenda") {
            reset(true);
            mostrarbomba(0);
            $(".btnPista").removeClass("d-none");
            $(".btnClearT").removeClass("d-none");
            $("#btnPista").one("click", pista);
        }
        if (dificultad == "infiltrado") {
            resetInfiltrado();
        }
        $(".btnReload").removeClass("d-none");
        $(".btnModal").addClass("d-none");
        $("#modal").modal("hide");
    } else {
        $(".modal-title").html("Inserta un Nombre!!");
    }
});
$("#btnClearT").on("click", function () {
    localStorage.clear()
    location.reload()
})
$("#btnReload").on("click", function () {
    audio("restart");
    location.reload();
});
function flip() {
    currentImg = $(this).children("img");
    if (lastImg == null) {
        lastImg = currentImg;
        lastCard = $(this);
        lastCard.css("backgroundImage", "url()");
        lastImg.css("display", "block");
        audio("match");
        lastCard.addClass("carta-selec");

        lastImg.show("fade", {}, 10, function () {
            lastImg.attr("src", lastImg.data("src"));
            lastImg.removeAttr("style").hide().fadeIn();
        });

    } else {
        currentImg.show("fade", {}, 10, function () {
            currentImg.removeAttr("style").hide().fadeIn();
            currentImg.attr("src", currentImg.data("src"));
        });
        if (lastImg[0] != currentImg[0]) {
            if (lastImg.data("src") == currentImg.data("src")) {
                $(this).css("backgroundImage", "url()");
                $(this).addClass("carta-win");
                lastCard.addClass("carta-win");
                currentImg.css("display", "block");
                scoreCounter++;
                progreso += 15;
                $(".progress-bar").css("width", progreso + "%");
                $("#scoreNum").html(scoreCounter);
                lastImg.attr("src", lastImg.data("src"));
                lastCard.off("click", flip);
                $(this).off("click", flip);
                inform("match");
                audio("match");
                lastImg.data("descubierta", "si");
                currentImg.data("descubierta", "si");
                if (scoreCounter >= 7) {
                    setTimeout(() => {
                        inform("win");
                        audio("win");
                        checkHighScore(errorCounter);
                        setTimeout(() => { location.reload() }, 1500);
                    }, 1000);
                }
                lastImg = null;
            } else {
                blockInteractions.css("display", "block");
                $(this).css("backgroundImage", "url()");
                currentImg.css("display", "block");
                inform("fail");
                audio("fail");
                $(this).addClass("carta-error");
                lastCard.addClass("carta-error");
                setTimeout(() => {
                    $(this).css("backgroundImage", "url(imgs/carta.jpg)");
                    lastCard.css("backgroundImage", "url(imgs/carta.jpg)");
                    lastImg.removeAttr("src");
                    currentImg.removeAttr("src");
                    $(this).removeClass("carta-error");
                    lastCard.removeClass("carta-error");
                    $(this).removeClass("carta-selec");
                    lastCard.removeClass("carta-selec");
                    currentImg.hide();
                    lastImg.hide();
                    errorCounter++;
                    console.log(errorCounter);
                    if (errorCounter >= 2 && dificultad == "leyenda") {
                        location.reload();
                        alert("Has perdido el modo LEYENDA");
                    }
                    $("#errorNum").html(errorCounter);
                    lastImg = null;
                    blockInteractions.hide();
                }, 1000);
            }
        }
    }
}
function mostrarbomba(tiempo) {
    tiempo = tiempo * 1000;
    blockInteractions.css("display", "block");
    cards.each(function () {
        if ($(this).children().data("src") == "imgs/bomba.png") {
            if (tiempo > 0) {
                $(this).children().css("display", "block");
                $(this).css("backgroundImage", "url()");
                $(this).show("fade", {}, 100, function () {
                    $(this).children().attr("src", "imgs/bomba.png");
                    $(this).children().removeAttr("style").hide().fadeIn();
                });
            }
            setTimeout(() => {
                $(this).one("click", explotar);
                $(this).css("backgroundImage", "url(imgs/carta.jpg)");
                $(this).children().removeAttr("src");
                $(this).children().hide();
                $(this).off("click", flip);
                bomba = $(this);
                blockInteractions.hide();
            }, tiempo);
        }
    });
}
function explotar() {
    blockInteractions.css("display", "block");
    bomba.css("backgroundImage", "url()");
    bomba.children().css("display", "block");
    bomba.children().attr("src", "imgs/bomba.png");
    bomba.effect("explode", {}, 500, setTimeout(function () {
        bomba.removeAttr("style").hide().fadeIn();
    }, 500));
    $("#info").data("bomba", "explotada");
    audio("bomb");
    $("#errorNum").html(errorCounter);
    setTimeout(() => {
        bomba.css("backgroundImage", "url(imgs/carta.jpg)");
        bomba.children().removeAttr("src");
        bomba.children().hide();
        reset();
        if (dificultad == "dificil" || dificultad == "leyenda") {
            mostrarbomba(0);
        } else {
            mostrarbomba(2);
        }
    }, 500);
}
function randomCards(arr) {
    let i = 0;
    arr = arr.sort((a, b) => 0.5 - Math.random());
    imgs.each(function () {
        $(this).data("src", arr[i]);
        i++;
    });
}
function reset(respuesta) {
    if (respuesta == true) {
        scoreCounter = 0;
        errorCounter = 0;
        $("#scoreNum").html(scoreCounter);
        $("#errorNum").html(errorCounter);
        progreso = 0;
        $(".progress-bar").css("width", progreso + "%");
    }
    cards.removeClass("carta-win");
    cards.removeClass("carta-error");
    cards.removeClass("carta-selec");
    imgs.removeData();
    lastImg = null;
    currentImg = null;
    cards.off("click");
    cards.css("backgroundImage", "url(imgs/carta.jpg)");
    cards.click(flip);
    imgs.css("display", "none");
    imgs.css("draggable", "false");
    randomCards(sources);
}
function resetInfiltrado() {
    randomCards(sources2);
    cards.click(flipInfiltrado);
    imgs.css("display", "none");
    imgs.css("draggable", "false");
    cards.each(function () {
        $(this).children().css("display", "inline");
        $(this).css("backgroundImage", "url()");
        $(this).children().attr("src", $(this).children().data("src"));
        setTimeout(() => {
            $(this).css("backgroundImage", "url(imgs/carta.jpg)");
            $(this).children().removeAttr("src");
            $(this).children().hide();
            blockInteractions.hide();
        }, 500);
    });
}
function flipInfiltrado() {
    currentImg = $(this).children("img");
    if (currentImg.data("src") == "imgs/carta6.png") {
        $(this).css("backgroundImage", "url()");
        $(this).addClass("carta-error");
        currentImg.css("display", "block");
        currentImg.show("fade", {}, 10, function () {
            currentImg.attr("src", currentImg.data("src"));
            currentImg.removeAttr("style").hide().fadeIn();
        });
        audio("fail");
        setTimeout(function () {
            location.reload();
            alert("Perdiste el Juego");
        }, 1000)
    } else {
        $(this).css("backgroundImage", "url()");
        currentImg.css("display", "block");
        audio("match");
        scoreCounter++;
        progreso += 34;
        $(".progress-bar").css("width", progreso + "%");
        $("#scoreNum").html(scoreCounter);
        $(this).addClass("carta-win");
        currentImg.show("fade", {}, 10, function () {
            currentImg.attr("src", currentImg.data("src"));
            currentImg.removeAttr("style").hide().fadeIn();
        });
        if (scoreCounter >= 3) {
            setTimeout(() => {
                inform("win");
                audio("win");
                setTimeout(() => { location.reload() }, 1500);
            }, 1000);
        }
    }
}


function checkHighScore(score) {
    highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    if (score < lowestScore) {
        saveHighScore(score, highScores);
        showHighScores();
    }
}
function saveHighScore(score, highScores) {
    const newScore = {
        "name": nick.html(),
        "score": score
    };
    highScores.push(newScore);
    highScores.sort((a, b) => a.score - b.score);
    highScores.splice(NO_OF_HIGH_SCORES);
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
};
function showHighScores() {
    highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    Array.prototype.push.apply(highScores, players);
    highScores.sort((a, b) => a.score - b.score);
    jQuery.each(highScores, function (i, val) {
        $("#TPNick" + i).html(val.name);
        $("#TPErr" + i).html(val.score + " Fallos");
    });
}

function pista() {
    audio("pista");
    blockInteractions.css("display", "block");
    lastImg = null;
    currentImg = null;
    cards.each(function () {
        if (dificultad == "leyenda") {
            $(this).children().css("display", "inline");
            $(this).css("backgroundImage", "url()");
            $(this).children().attr("src", $(this).children().data("src"));
            if ($(this).children().data("descubierta") != "si") {
                setTimeout(() => {
                    $(this).css("backgroundImage", "url(imgs/carta.jpg)");
                    $(this).children().removeAttr("src");
                    $(this).children().hide();
                    blockInteractions.hide();
                }, 500);
            } else {
                $(this).children().removeData("descubierta");
            }
        } else {
            $(this).children().css("display", "inline");
            $(this).css("backgroundImage", "url()");
            $(this).children().attr("src", $(this).children().data("src"));
            bomba.off("click");
            if ($(this).children().data("src") != "imgs/bomba.png" && $(this).children().data("descubierta") != "si") {
                setTimeout(() => {
                    $(this).css("backgroundImage", "url(imgs/carta.jpg)");
                    $(this).children().removeAttr("src");
                    $(this).children().hide();
                    blockInteractions.hide();
                }, 2000);
            } else {
                $(this).children().removeData("descubierta");
            }
        }
    });
}
function audio(msg) {
    if (msg == "win") {
        const audio = new Audio("audio/win.wav");
        audio.volume = 0.01;
        audio.play();
    }
    if (msg == "fail") {
        const audio = new Audio("audio/fail.mp3");
        audio.volume = 0.03;
        audio.play();
    }
    if (msg == "match") {
        const audio = new Audio("audio/match.wav");
        audio.volume = 0.01;
        audio.play();
    }
    if (msg == "record") {
        const audio = new Audio("audio/record.wav");
        audio.volume = 0.01;
        audio.play();
    }
    if (msg == "bomb") {
        const audio = new Audio("audio/bomb.wav");
        audio.volume = 0.01;
        audio.play();
    }
    if (msg == "start") {
        const audio = new Audio("audio/start.mp3");
        audio.volume = 0.03;
        audio.play();
    }
    if (msg == "pista") {
        const audio = new Audio("audio/pista.mp3");
        audio.volume = 0.03;
        audio.play();
    }
    if (msg == "restart") {
        const audio = new Audio("audio/restart.mp3");
        audio.volume = 0.03;
        audio.play();
    }
}
function inform(msg) {
    if (msg == "win") {
        if (localStorage.getItem("lang") == "ES") {
            $("#info").html("Has ganado: " + errorCounter + " fallos!!");
        } else {
            $("#info").html("You win: " + errorCounter + " mistakes!!");
        }
    }
    if (msg == "fail") {
        if (localStorage.getItem("lang") == "ES") {
            $("#info").html("Prueba otra vez!");
        } else {
            $("#info").html("Try again!");
        }
    }
    if (msg == "match") {
        if (localStorage.getItem("lang") == "ES") {
            $("#info").html("Has acertado!");
        } else {
            $("#info").html("You're right!");
        }
    }
    if (msg == "record") {
        if (localStorage.getItem("lang") == "ES") {
            $("#info").html(
                "Bien jugado! El nuevo record es: " + errorCounter + " fallos!"
            );
        } else {
            $("#info").html(
                "Good game! The new record is: " + errorCounter + " mistakes!"
            );
        }
    }
}

function changeLang() {
    let idioma = localStorage.getItem("lang");
    $.getJSON("lang/lang.json", function (arr) {
        $("#index").html(arr.lang[idioma].index);
        $("#infor").html(arr.lang[idioma].infor);
        $("#title").html(arr.lang[idioma].title);
        $("#score").html(arr.lang[idioma].score);
        $("#error").html(arr.lang[idioma].error);
        $("#topErrors").html(arr.lang[idioma].error);
        $("#topPlayer").html(arr.lang[idioma].topp);
        $("#language").html(arr.lang[idioma].language);
        $("#footer").html(arr.lang[idioma].footer);
        $("#info").html(arr.lang[idioma].progress);
    });
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        $('<img/>')[0].src = this;
    });
}