function loadLanguage() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadJSON(this.responseText);
        }
    };

    xhr.open("GET", "idioma.json", true);
    xhr.send();
}

function loadJSON(json) {
    let docJSON = JSON.parse(json);

    let elementosLangJSON = docJSON["lang"];

    let lang = ""

    if (localStorage.getItem("idioma") != null) {
        lang = localStorage.getItem("idioma")
    } else {
        lang = "es"
    }

    let elements = elementosLangJSON[lang];

    puntuacionTexto.text(elements["score"]);
    puntuacionTextoRanking.text(elements["score"]);
    errorTexto.text(elements["errors"]);
    top_player.text(elements["top_player"]);
    idiomaTexto.text(elements["language"]);
    descripcion.text(elements["game_description"]);
}

function barraInformativaTexto(estado) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let docJSON = JSON.parse(this.responseText);

            let elementosLangJSON = docJSON["lang"];

            let lang = ""

            if (localStorage.getItem("idioma") != null) {
                lang = localStorage.getItem("idioma")
            } else {
                lang = "ES"
            }

            let elements = elementosLangJSON[lang];

            barra_informativa.text(elements[estado]);
        }
    };

    xhr.open("GET", "idioma.json", true);
    xhr.send();
}

loadLanguage();