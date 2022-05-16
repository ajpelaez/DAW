function getIdioma() {
    if (localStorage.getItem("idioma") != null) {
        return localStorage.getItem("idioma");
    } else {
        return "es";
    }
} 


function loadLanguage() {

    $.getJSON("idioma.json", function(respuesta) {
        let idioma = getIdioma();

        let elements = respuesta["lang"][idioma];

        puntuacionTexto.text(elements["score"]);
        puntuacionTextoRanking.text(elements["score"]);
        errorTexto.text(elements["errors"]);
        descripcion.text(elements["game_description"]);
        mostrarTodasLasCartas.text(elements["show_button"]);
        textoIntroduceNombre.text(elements["model_name"]);
        textoSeleccionaDificultad.text(elements["modal_select"]);
        textoFacil.text(elements["modal_easy"]);
        textoDificil.text(elements["modal_challenging"]);
        textoLeyenda.text(elements["text_legends"]);
        textoBotonCancelar.text(elements["modal_close"]);
        boton_comenzar_modal.text(elements["modal_start"]);
        top_player.text(elements["top_player"]);
        nick.text(elements["player_name"]);
        textoBarraProgreso.text(elements["progress_bar"]);
        textoJuego.text(elements["text_game"]);
        textoInformacion.text(elements["text_info"]);

        if (boton_comenzar.attr("data-estado") == "start") {
            boton_comenzar.text(elements["start_game"]);
        } else {
            boton_comenzar.text(elements["restart_game"]);
        }

    });

}

function barraInformativaTexto(estado) {
    $.getJSON("idioma.json", function(respuesta) {

        let idioma = getIdioma();

        let elements = respuesta["lang"][idioma];

        barra_informativa.text(elements[estado]);
    });
}


loadLanguage();

function cambiarTextoIdioma(boton) {
    // Guarda en el web storage el idioma
    localStorage.setItem("idioma", boton.currentTarget.id);

    loadLanguage();
}