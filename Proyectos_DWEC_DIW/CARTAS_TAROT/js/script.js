    //Intrduzco el nombre de usuario y lo pongo en el html
    let nombre = prompt("Introduce tu nombre de usuario: ");
    document.getElementById("nombre").innerHTML = (nombre);

    let puntos = document.getElementById('puntos');
    let puntosError = document.getElementById('puntosError');
    let puntuacion = 0;
    let puntuacionError = 0;
    let click1 = '';
    let click2 = '';

    let jugadorGana = document.getElementById("jugadorGana");
    let fallosJugadorGana = document.getElementById("errorJugadorGana");

    if (localStorage.getItem('ganador')) {
        let cookieJugadorGana = localStorage.getItem('ganador').split('?');
        let nombreCookieJugadorGana = cookieJugadorGana[0];
        let erroresCookieJugadorGana = cookieJugadorGana[1];

        jugadorGana.innerHTML = nombreCookieJugadorGana;
        fallosJugadorGana.value = erroresCookieJugadorGana;
    }

    let img1 = document.getElementById("img1");
    let img2 = document.getElementById("img2");
    let img3 = document.getElementById("img3");
    let img4 = document.getElementById("img4");
    let img5 = document.getElementById("img5");
    let img6 = document.getElementById("img6");
    let img7 = document.getElementById("img7");
    let img8 = document.getElementById("img8");
    let img9 = document.getElementById("img9");
    let img10 = document.getElementById("img10");
    let img11 = document.getElementById("img11");
    let img12 = document.getElementById("img12");

    let arrayCartas = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];
    var arrayImagenes = ["imagenes/diablo.jpg", "imagenes/enamorados.jpg", "imagenes/colgado.jpg", "imagenes/loco.jpg", "imagenes/mago.jpg",
        "imagenes/templanza.jpg", "imagenes/diablo.jpg", "imagenes/enamorados.jpg", "imagenes/colgado.jpg", "imagenes/loco.jpg",
        "imagenes/mago.jpg", "imagenes/templanza.jpg"];



    window.addEventListener('load', function () {
        arrayImagenes.sort(function () { return Math.random() - 0.5 });
    });

    function cambiarImagen(foto) {
        if (foto.id == "img1") {
            arrayCartas[0].src = arrayImagenes[0];
        }
        if (foto.id == "img2") {
            arrayCartas[1].src = arrayImagenes[1];
        }
        if (foto.id == "img3") {
            arrayCartas[2].src = arrayImagenes[2];
        }
        if (foto.id == "img4") {
            arrayCartas[3].src = arrayImagenes[3];
        }
        if (foto.id == "img5") {
            arrayCartas[4].src = arrayImagenes[4];
        }
        if (foto.id == "img6") {
            arrayCartas[5].src = arrayImagenes[5];
        }
        if (foto.id == "img7") {
            arrayCartas[6].src = arrayImagenes[6];
        }
        if (foto.id == "img8") {
            arrayCartas[7].src = arrayImagenes[7];
        }
        if (foto.id == "img9") {
            arrayCartas[8].src = arrayImagenes[8];
        }
        if (foto.id == "img10") {
            arrayCartas[9].src = arrayImagenes[9];
        }
        if (foto.id == "img11") {
            arrayCartas[10].src = arrayImagenes[10];
        }
        if (foto.id == "img12") {
            arrayCartas[11].src = arrayImagenes[11];
        }
    }

    arrayCartas.forEach(element => {
        element.addEventListener('click', function comparar(e) {
            if (click1 == '') {
                click1 = e.target;
            } else {
                click2 = e.target;
                if (click1.src == click2.src) {
                    let barraInformativa = "Has acertado!!";
                    document.getElementById("barraInformativa").innerHTML = (barraInformativa);
                    puntuacion++;
                    puntos.value = puntuacion;
                    click1.classList.add("sombra");
                    click2.classList.add("sombra");
                    click1 = '';
                    click2 = '';
                } else {
                    setTimeout(() => {
                        let barraInformativa = "Intentalo de nuevo";
                        document.getElementById("barraInformativa").innerHTML = (barraInformativa);
                        click1.src = "imagenes/vuelta.jpg";
                        click2.src = "imagenes/vuelta.jpg";
                        puntuacionError++;
                        puntosError.value = puntuacionError;
                        click1 = '';
                        click2 = '';
                    }, 500);
                }
            }
            if (puntos.value == 6) {
                setTimeout(() => {
                    nombre = nombre + '?' + puntuacionError;
                    if (localStorage.getItem('ganador')) {
                        compararCookie();
                    } else {
                        localStorage.setItem('ganador', nombre);
                    }
                    alert("Has ganado!! Pero con un total de " + puntuacionError + " fallos :(");
                    location.reload();
                }, 500);
            }
        })
    });
    if (localStorage.getItem('lenguaje') == 'español') {
        cambiarIdiomaEs();
    }
    if (localStorage.getItem('lenguaje') == 'ingles') {
        cambiarIdiomaEn();
    }


    //Cambiar idioma
    document.getElementById("cambiaContenidoEs").addEventListener("click", cambiarIdiomaEs);
    document.getElementById("cambiaContenidoEn").addEventListener("click", cambiarIdiomaEn);

    function cambiarIdiomaEn() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                cambiarIdioma(myArr);
            }
        };
        xmlhttp.open("GET", "idiomas/lang.json", true);
        
        xmlhttp.send();
        localStorage.setItem('lenguaje', 'ingles');
    }
    function cambiarIdiomaEs() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                cambiarIdioma(myArr);
            }
        };
        xmlhttp.open("GET", "idiomas/lang.json", true);
        xmlhttp.send();
        localStorage.setItem('lenguaje', 'español');
    }

    function cambiarIdioma(arr) {
        let idioma;
        if (localStorage.getItem('lenguaje') == 'ingles') {
            idioma = arr["lang"]["EN"];
        } else {
            idioma = arr["lang"]["ES"];
        }
        document.getElementById("cambio0").innerHTML = idioma["TITULO"];
        document.getElementById("cambio1").innerHTML = idioma["SCORE"];
        document.getElementById("cambio2").innerHTML = idioma["ERRORS"];
        document.getElementById("cambio3").innerHTML = idioma["TOPP"];
        document.getElementById("cambio4").innerHTML = idioma["TOPERROR"];
        document.getElementById("cambio5").innerHTML = idioma["LANGUAJE"];
        document.getElementById("barraInformativa").innerHTML = idioma["INFO"];
        document.getElementById("cambio7").innerHTML = idioma["DESCRI"];
    



    }
    //ranking
    function compararCookie() {
        let cookieJugadorGana = localStorage.getItem('ganador').split('?');
        let nombreCookieJugadorGana = cookieJugadorGana[0];
        let erroresCookieJugadorGana = cookieJugadorGana[1];

        if (puntuacionError >= erroresCookieJugadorGana) {
            return null;
        } else {
            localStorage.setItem('ganador', nombre);
        }
    }

