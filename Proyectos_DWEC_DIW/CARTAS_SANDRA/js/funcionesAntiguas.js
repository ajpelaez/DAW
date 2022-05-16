/*LECTURA DE DOCUMENTOS TXT Y XML*/
function cambiaDescripcion(leng) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tagDescCompleta").innerHTML = this.responseText;
        }
    };
    if (leng == "eng") {
        xhr.open("GET", "../descripcion_en.txt", true);
        // .send: envía la solicitud al servidor.
        //    Si utilizamos POST debemos pasar los datos por parámetro 
    } else {
        xhr.open("GET", "../descripcion_es.txt", true);
    }

    xhr.send();

}


function cargarIdiomas(idioma) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cargarXML(this, idioma);
        }
    };
    xhr.open("GET", "../idioma.xml", true);
    xhr.send();
}

function cargarXML(xml, leng) {
    var docXML = xml.responseXML;
    let childN;
    if (leng == "eng") {
        childN = 0;
    }
    else {
        childN = 1;
    }
    document.getElementById("estadisticas").innerHTML = docXML.getElementsByTagName("STADISTICS")[childN].textContent;

    document.getElementById("barra_informativa").innerHTML = docXML.getElementsByTagName("INFOBAR")[childN].textContent;

    document.getElementById("tagPuntuacion").innerHTML = docXML.getElementsByTagName("SCORE")[childN].textContent;

    document.getElementById("tagErrores").innerHTML = docXML.getElementsByTagName("ERRORS")[childN].textContent;

    document.getElementById("tagErroresTop").innerHTML = docXML.getElementsByTagName("ERRORS")[childN].textContent;

    document.getElementById("tagTop").innerHTML = docXML.getElementsByTagName("TOPPLAYER")[childN].textContent;

    matchmsg = docXML.getElementsByTagName("MATCHMESSAGE")[childN].textContent;

    errormsg = docXML.getElementsByTagName("ERRORMESSAGE")[childN].textContent;

    document.getElementById("tagDesc").innerHTML = docXML.getElementsByTagName("DESC")[childN].textContent;

    win = docXML.getElementsByTagName("WIN")[childN].textContent;
    document.getElementById("leng").innerHTML = leng;


}

/* COOKIES */
function setCookie(nombreCookie, valorCookie, expiraDia = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (expiraDia * 24 * 60 * 60 * 1000))
    let expiracion = `expira=${date.toUTCString()}`;
    document.cookie = `${nombreCookie}=${valorCookie}; ${expiracion};`;
}

function getCookie(nombreCookie) {
    let nombre = nombreCookie + "=";
    let arrayCookie = document.cookie.split(";");
    for (let i = 0; i < arrayCookie.length; i++) {
        let cookie = arrayCookie[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nombre) == 0) {
            return cookie.substring(nombre.length, cookie.length);
        }
    }
    return "";
}

function cambiarIdiomaJSON(idioma) {
    const xmlhttp = new XMLHttpRequest();
    const url = "lang.json";
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const myArr = JSON.parse(this.responseText);
            cambiaTexto(myArr, idioma);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}