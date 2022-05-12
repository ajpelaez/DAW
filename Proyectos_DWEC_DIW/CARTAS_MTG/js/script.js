let msgRight;
let msgWrong;
let msgWin;

window.addEventListener('load', function () {
    arrSrc.sort(function () { return Math.random() - 0.5 });
    var nomUsuario = document.getElementById('usu');
    var usuario = prompt("Escribe tu nombre de usuario: ");
    nomUsuario.innerHTML = usuario;
});



//Mensajes dinámicos
const mensajes = document.getElementById('alerts');


//Ranking
var usuGanador = document.getElementById('winner');
var fallosGanador = document.getElementById('erroresGanador');

//MArcador y errores
const marcador = document.getElementById('marcador');
const errores = document.getElementById('errores');


//Si tenemos info de ganador guardada la mostramos en su respectiva tabla

if (localStorage.getItem('ganador')) {
    let cookieganador = localStorage.getItem('ganador');
    setGanador(cookieganador);
}
/*
if (getCookie('ganador')) {
    let cganador = getCookie('ganador');

    setGanador(cganador);
}*/

// Cartas HTML
let carta1 = document.getElementById('carta1');
let carta2 = document.getElementById('carta2');
let carta3 = document.getElementById('carta3');
let carta4 = document.getElementById('carta4');
let carta5 = document.getElementById('carta5');
let carta6 = document.getElementById('carta6');
let carta7 = document.getElementById('carta7');
let carta8 = document.getElementById('carta8');
let carta9 = document.getElementById('carta9');
let carta10 = document.getElementById('carta10');
let carta11 = document.getElementById('carta11');
let carta12 = document.getElementById('carta12');

//Array de las cartas
const arrCartas = [
    carta1, carta2, carta3, carta4, carta5, carta6,
    carta7, carta8, carta9, carta10, carta11, carta12
];

//Array con las url de las cartas 
const arrSrc = [
    "url(img/mtg1.jpg)", "url(img/mtg2.jpg)", "url(img/mtg3.jpg)",
    "url(img/mtg4.jpg)", "url(img/mtg5.jpg)", "url(img/mtg6.jpg)",
    "url(img/mtg1.jpg)", "url(img/mtg2.jpg)", "url(img/mtg3.jpg)",
    "url(img/mtg4.jpg)", "url(img/mtg5.jpg)", "url(img/mtg6.jpg)"
];


//Variables con las que se trabajará las selecciones y puntos
let seleccion1 = '';
let seleccion2 = '';
let puntuacion = 0;
let contadorErr = 0;

//Añadir la función de dar la vuelta a la carta
//Se asigna al azar una posición del array de las URL a cada una de las cartas
for (let i = 0; i < arrCartas.length; i++) {
    const carta = arrCartas[i];
    carta.addEventListener('click', function () {
        carta.style.backgroundImage = arrSrc[i];
    })
}

arrCartas.forEach(element => { 

    element.addEventListener('click', function comparar(e) {

        if (seleccion1 == '') { 
            seleccion1 = e.target; 

        } else {
            if (seleccion1 != e.target) { 


                seleccion2 = e.target;
                if (seleccion1.style.backgroundImage === seleccion2.style.backgroundImage) {

                    seleccion1.style.visibility = 'inherit';
                    seleccion2.style.visibility = 'inherit';

                    seleccion1.classList.add('sombreado');
                    seleccion2.classList.add('sombreado');
                  
                    seleccion1 = '';
                    seleccion2 = '';

                    puntuacion++;
                    mensajes.innerHTML = msgRight;
                    marcador.value = puntuacion;

                    if (marcador.value == 6) {
                        alert(msgWin + contadorErr);
                       
                        if (fallosGanador.value >= contadorErr) {

                            let usuarioErrores = (usuario + "&" + contadorErr);

                            localStorage.setItem('ganador', usuarioErrores.toString())
                        }

                        location.reload();
                    }
                } else {

                    setTimeout(() => { 

                        if (seleccion1.style.visibility == 'inherit') {
                            seleccion2.style.backgroundImage = 'url(img/dorso.jpg)';

                        } else if (seleccion2.style.visibility == 'inherit') { 

                            seleccion1.style.backgroundImage = 'url(img/dorso.jpg)';

                        } else { 
                            seleccion1.style.backgroundImage = 'url(img/dorso.jpg)';
                            seleccion2.style.backgroundImage = 'url(img/dorso.jpg)';

                        }

                        seleccion1 = '';
                        seleccion2 = '';

                        mensajes.innerHTML = msgWrong;
                       

                        contadorErr++;
                        errores.value = contadorErr;


                    }, 500);

                }
            }
        }

    })
});

function setGanador(c) {

    let arrGanador = c.split('&');
    fallosGanador.value = arrGanador[1];
    usuGanador.innerHTML = arrGanador[0];

}


const btnES = document.getElementById('btnES');
const btnEN = document.getElementById('btnEN');


if (!localStorage.getItem('idioma')) {
    idiomaES();
}

if (localStorage.idioma == 'ES') { 
    idiomaES();
}

if (localStorage.idioma == 'EN') {
    idiomaEN();
}


btnES.addEventListener('click', idiomaES);

btnEN.addEventListener('click', idiomaEN);

function idiomaES() {
    idioma('ES');
}
function idiomaEN() {
    idioma('EN');
}

function idioma(idi) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText)
            cargarJSON(myArr, idi);
        }
    };
    xhr.open("GET", "lang/lang.json", true);
    xhr.send();
}


function cargarJSON(json, idi) {
    
    var idioma = json["LANGUAGE"][idi];

    console.log(idioma);

    document.getElementById('score').innerHTML = idioma['SCORE'];
    document.getElementById('errors').innerHTML = idioma["ERRORS"];
    document.getElementById('topPlayer').innerHTML = idioma["TOP"];
    document.getElementById('topErr').innerHTML = idioma["ERRTOP"];
    document.getElementById('language').innerHTML = idioma["LANG"];
    document.getElementById('alerts').innerHTML = idioma['ALERTS'];
    
    msgRight =  idioma['RIGHT'];
    msgWrong =  idioma['WRONG'];
    msgWin =  idioma['WIN'];

    document.getElementById("desc").innerHTML = idioma['DESC'];

    localStorage.setItem('idioma', idi); 
}

