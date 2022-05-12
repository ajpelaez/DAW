let msgRight;
let msgWrong;
let msgWin;
let usuario;

$(function () {
  $('[data-toggle="popover"]').popover();
});

$(function () {
  $(".example-popover").popover({
    container: "body",
  });
});

if (localStorage.getItem("ganadores")) {
  //Se establecen los ganadores del localstorage

  setGanadores(JSON.parse(localStorage.ganadores));
} else {
  //Los ganadores por defecto se asignan
  var arrGanadores = ["10&Carol", "20&Gabo", "30&Eve", "40&Palo", "50&Gramo"];

  let ganadores = JSON.stringify(arrGanadores);

  localStorage.setItem("ganadores", ganadores);

  setGanadores(JSON.parse(localStorage.ganadores));
}

//Array de las cartas
const arrCartas = [
  $("#carta1")[0],
  $("#carta2")[0],
  $("#carta3")[0],
  $("#carta4")[0],
  $("#carta5")[0],
  $("#carta6")[0],
  $("#carta7")[0],
  $("#carta8")[0],
  $("#carta9")[0],
  $("#carta10")[0],
  $("#carta11")[0],
  $("#carta12")[0],
  $("#carta13")[0],
  $("#carta14")[0],
  $("#carta15")[0],
];

//Array con las url de las cartas
const arrSrc = [
  "img/mtg1.jpg",
  "img/mtg2.jpg",
  "img/mtg3.jpg",
  "img/mtg4.jpg",
  "img/mtg5.jpg",
  "img/mtg6.jpg",
  "img/mtg1.jpg",
  "img/mtg2.jpg",
  "img/mtg3.jpg",
  "img/mtg4.jpg",
  "img/mtg5.jpg",
  "img/mtg6.jpg",
  "img/mtg7.jpg",
  "img/mtg7.jpg",
  "img/bomba.jpg",
];

const arrInf = [
  "img/mtg2.jpg",
  "img/mtg2.jpg",
  "img/mtg2.jpg",
  "img/mtg2.jpg",
  "img/mtg2.jpg",
  "img/mtg2.jpg",
  "img/mtg2.jpg",
  "img/mtg2.jpg",
  "img/mtg2.jpg",
  "img/mtg2.jpg",
  "img/mtg2.jpg",
  "img/mtg2.jpg",
  "img/espia1.png",
  "img/espia2.jpg",
  "img/espia3.png",
];

const arrProgress = [
  "0%",
  "14.27%",
  "28.57%",
  "42.85%",
  "57.14%",
  "71.43%",
  "85.71%",
  "100%",
];

let seleccion1 = "";
let seleccion2 = "";
let puntuacion = 0;
let contadorErr = 0;

$("#btnComenzar").click(function startGame() {
  $("#btnStart").off();
  $("#btnStart").css("display", "none");

  $("#btnReplay").css("display", "inherit");

  usuario = $("#usuario").val();
  $("#usu").html(usuario);

  //Dificultad

  var dificultad = $("input[name='dificultad']:checked").val();
  if (!dificultad) {
    dificultad = "medium";
  }

  reinicio(dificultad);

  arrCartas.forEach((element) => {
    $(element).click(function comparar(e) {
      if (seleccion1 == "") {
        seleccion1 = e.target;
        if ($(seleccion1).data("bomba")) {
          $(".audio")[3].play();

          setTimeout(() => {
            $(seleccion1).attr("src", "img/dorso.jpg");
            seleccion1 = "";
            seleccion2 = "";
            seleccion1;
            return bomba();
          }, 500);
        } else {
          $(".audio")[0].play();
        }
      } else {
        if (seleccion1 != e.target) {
          seleccion2 = e.target;

          if ($(seleccion2).data("bomba")) {
            $(".audio")[3].play();

            setTimeout(() => {
              $(seleccion1).attr("src", "img/dorso.jpg");
              $(seleccion2).attr("src", "img/dorso.jpg");
              seleccion1 = "";
              seleccion2 = "";
              seleccion1;
              return bomba();
            }, 500);
          } else {
            $(".audio")[0].play();

            if ($(seleccion1).attr("src") === $(seleccion2).attr("src")) {
              $(seleccion1).addClass("sombreado");

              $(seleccion2).addClass("sombreado");

              $(".audio")[1].play();

              seleccion1 = "";
              seleccion2 = "";

              puntuacion++;

              $("#alerts").html(msgRight);
              $("#alerts").removeClass("alert-dark");
              $("#alerts").removeClass("alert-danger");
              $("#alerts").addClass("alert-info");
              $("#marcador").val(puntuacion);

              cambiarProgreso(puntuacion);

              if ($("#marcador").val() == 7) {
                alert(msgWin + $("#errores").val());

                var erroresJugador = parseInt($("#errores").val());

                posicionarJugador(usuario, erroresJugador);

                $(".img").off("click");

                $("#alerts").html(msgWin + $("#errores").val());
                $("#alerts").removeClass("alert-dark");
                $("#alerts").removeClass("alert-danger");
                $("#alerts").removeClass("alert-info");
                $("#alerts").addClass("alert-success");
              }
            } else {
              setTimeout(() => {
                if ($(seleccion1).hasClass("sombreado")) {
                  $(seleccion2).attr("src", "img/dorso.jpg");
                  $(".audio")[2].play();
                } else if ($(seleccion2).hasClass("sombreado")) {
                  $(seleccion1).attr("src", "img/dorso.jpg");
                  $(".audio")[2].play();
                } else {
                  $(seleccion1).attr("src", "img/dorso.jpg");
                  $(seleccion2).attr("src", "img/dorso.jpg");
                  $(".audio")[2].play();
                }

                seleccion1 = "";
                seleccion2 = "";

                $("#alerts").html(msgWrong);
                $("#alerts").removeClass("alert-dark");
                $("#alerts").removeClass("alert-info");
                $("#alerts").addClass("alert-danger");

                contadorErr++;

                if (dificultad == "leyenda") {
                  if (contadorErr == 3) {
                    $(".img").off("click");
                    $(".img").toggle("highlight");
                    $("#alerts").html(
                      "¡Has perdido! Has tenido tres errores en el modo leyenda..."
                    );
                    $(".audio")[4].play();
                    $("#alerts").removeClass("alert-dark");
                    $("#alerts").removeClass("alert-success");
                    $("#alerts").removeClass("alert-info");
                    $("#alerts").addClass("alert-danger");
                    contadorErr = 0;
                    setTimeout(() => {
                      $(".img").toggle("highlight");
                    }, 3000);
                  }
                }

                $("#errores").val(contadorErr);
              }, 500);
            }
          }
        }
      }
    });
  });
});



function reinicio(dificultad) {
  //En caso de reinicio, se eliminan errores y puntuación acumulada
  $(".img").off("click");
  contadorErr = 0;
  $("#errores").val(contadorErr);
  puntuacion = 0;
  cambiarProgreso(puntuacion);
  $("#marcador").val(puntuacion);

  //Desordenamos el array
  arrSrc.sort(function () {
    return Math.random() - 0.5;
  });

  //Borramos los aciertos, se les pone el dorso a todas las cartas, se asigna la función a dar la vuelta y una es la bomba
  for (let i = 0; i < arrCartas.length; i++) {
    const carta = arrCartas[i];

    $(carta).removeClass("sombreado");
    $(carta).attr("src", "img/dorso.jpg");

    $(carta).removeData("bomba");
    $(carta).removeData("infiltrado");
    //  $(arrSrc[i]).removeData("bomba");

    if (arrSrc[i] == "img/bomba.jpg") {
      $(this).data("bomba", true);
      $(carta).data("bomba", true);
    }

    $(carta).click(function () {
      $(this).fadeOut(100, function () {
        $(this).fadeIn(100);
      });

      $(this).attr("src", arrSrc[i]);
    });
  }

  $("#alerts").html("Start!");

  $("#alerts").removeClass("alert-success");
  $("#alerts").removeClass("alert-danger");
  $("#alerts").removeClass("alert-info");
  $("#alerts").addClass("alert-dark");

  //Dificultad fácil
  if (dificultad == "easy") {
    $("#btnAyuda").css("display", "inherit");
    $("#alerts").html("Ayuda utilizada, ¡no podrás usarla más!");
    $("#btnAyuda").click(function () {
      for (let i = 0; i < arrCartas.length; i++) {
        const carta = arrCartas[i];
        const fondo = arrSrc[i];

        if ($(carta).hasClass("sombreado")) {
        } else {
          $(carta).attr("src", arrSrc[i]);
          setTimeout(() => {
            $(carta).attr("src", "img/dorso.jpg");
          }, 2000);
        }
      }
      $("#btnAyuda").css("display", "none");
    });
  }

  //Dificultad media

  if (dificultad == "medium") {
    //Recorremos todas las cartas buscando la bomba

    arrCartas.forEach((carta) => {
      if ($(carta).data("bomba")) {
        $(carta).attr("src", "img/bomba.jpg");

        setTimeout(() => {
          $(carta).attr("src", "img/dorso.jpg");
        }, 2000);
      }
    });
  }

  //Difícil

  if (dificultad == "hard") {
    //Por defecto es dificil
  }

  //Leyenda
  if (dificultad == "leyenda") {
    arrCartas.forEach((carta) => {
      if ($(carta).data("bomba")) {
        $(carta).attr("src", "img/bomba.jpg");

        setTimeout(() => {
          $(carta).attr("src", "img/dorso.jpg");
        }, 1000);
      }
    });
  }
}

function bomba() {
  //Dar la vuelta a las cartas porque se reinicia mediante la bomba
  for (let i = 0; i < arrCartas.length; i++) {
    const carta = arrCartas[i];

    $(carta).removeClass("sombredo");
    $(carta).removeClass("sombreado");
    $(carta).attr("src", "img/dorso.jpg");
  }

  contadorErr++;
  $("#errores").val(contadorErr);

  puntuacion = 0;
  cambiarProgreso(puntuacion);
  $("#marcador").val(puntuacion);
  $(".tablero").effect("bounce", "fast");
}

function cambiarProgreso(punt) {
  $("#progress").css("width", arrProgress[punt]);
}

function setGanador(c) {
  let arrGanador = c.split("&");

  $("#erroresGanador").val(arrGanador[1]);
  $("#winner").html(arrGanador[0]);
}

function setGanadores(g) {
  let primero = g[0].split("&");
  $("#winner").html(primero[1]);
  $("#erroresGanador").val(primero[0]);

  let segundo = g[1].split("&");
  $("#segundo").html(segundo[1]);
  $("#erroresSegundo").val(segundo[0]);

  let tercero = g[2].split("&");
  $("#tercero").html(tercero[1]);
  $("#erroresTercero").val(tercero[0]);

  let cuarto = g[3].split("&");
  $("#cuarto").html(cuarto[1]);
  $("#erroresCuarto").val(cuarto[0]);

  let quinto = g[4].split("&");
  $("#quinto").html(quinto[1]);
  $("#erroresQuinto").val(quinto[0]);

  localStorage.setItem("ganadores", JSON.stringify(g));
}

function posicionarJugador(usu, errores) {
  var contador = 0;
  var seguir = true;
  var ganadores = JSON.parse(localStorage.ganadores);
  ganadores.forEach((ganador) => {
    //Recorremos el array de ganadores

    var errorGanador = ganador.split("&"); // Por cada uno, sacamos los errores

    if (errores <= parseInt(errorGanador[0]) && seguir) {
      //Si los errores son menores o iguales que ese jugador

      var cookieJugador = errores + "&" + usu;
      ganadores.splice(contador, 0, cookieJugador); //Metemos el nuevo jugador en la posición que estaba este jugador "empuja el array"
      ganadores.pop(); // eliminamos el último jugador del array para que sigan siendo 5, y lo guardamos en el local
      setGanadores(ganadores);
      seguir = false;
    }

    contador++;
  });
}

/*if (erroresGanador >= erroresJugador) {
  var usuarioErrores = usuario + "&" + erroresJugador;
  localStorage.setItem("ganador", usuarioErrores.toString());
  setGanador(usuarioErrores.toString());
}*/

if (!localStorage.getItem("idioma")) {
  idioma("ES");
}

if (localStorage.idioma == "ES") {
  idioma("ES");
}

if (localStorage.idioma == "EN") {
  idioma("EN");
}

$("#btnES").click(function () {
  idioma("ES");
});
$("#btnEN").click(function () {
  idioma("EN");
});

function idioma(idi) {

  $.getJSON("lang/lang.json", function (respuesta) {

    var idioma = respuesta["LANGUAGE"][idi];

    $("#score").html(idioma["SCORE"]);
    $("#errors").html(idioma["ERRORS"]);
    $("#topPlayer").html(idioma["TOP"]);
    $("#topErr").html(idioma["ERRTOP"]);
    $("#language").html(idioma["LANG"]);
    $("#alerts").html(idioma["ALERTS"]);

    msgRight = idioma["RIGHT"];
    msgWrong = idioma["WRONG"];
    msgWin = idioma["WIN"];

    $("#desc").html(idioma["DESC"]);

    localStorage.setItem("idioma", idi);
  });
}

$('#btnInfiltrado').click(function infiltrado() {

  $("#btnStart").off();
  $("#btnStart").css("display", "none");

  $("#btnReplay").css("display", "inherit");

  usuario = $("#usuario").val();
  $("#usu").html(usuario);

  //En caso de reinicio, se eliminan errores y puntuación acumulada
  $(".img").off("click");
  contadorErr = 0;
  $("#errores").val(contadorErr);
  puntuacion = 0;
  cambiarProgreso(puntuacion);
  $("#marcador").val(puntuacion);

  //Desordenamos el array
  arrInf.sort(function () {
    return Math.random() - 0.5;
  });

  //Borramos los aciertos, se les pone el dorso a todas las cartas, se asigna la función a dar la vuelta y una es la bomba
  for (let i = 0; i < arrCartas.length; i++) {
    const carta = arrCartas[i];

    $(carta).removeClass("sombreado");
    $(carta).attr("src", "img/dorso.jpg");

    $(carta).removeData("bomba");
    $(carta).removeData("infiltrado");

    if (arrInf[i] == "img/espia2.jpg" || arrInf[i] == "img/espia1.png" || arrInf[i] == "img/espia3.png") {
      $(this).data("infiltrado", true);
      $(carta).data("infiltrado", true);
    }


    $(carta).click(function () {
      $(this).fadeOut(100, function () {
        $(this).fadeIn(100);
      });

      $(this).attr("src", arrInf[i]);
    });

    $("#alerts").html("Start!");

    $("#alerts").removeClass("alert-success");
    $("#alerts").removeClass("alert-danger");
    $("#alerts").removeClass("alert-info");
    $("#alerts").addClass("alert-dark");

    
  }

  for (let i = 0; i < arrCartas.length; i++) {
        const carta = arrCartas[i];
        const fondo = arrInf[i];

        if ($(carta).hasClass("sombreado")) {
        } else {
          $(carta).attr("src", arrInf[i]);
          setTimeout(() => {
            $(carta).attr("src", "img/dorso.jpg");
          }, 2000);
        }
      }

  arrCartas.forEach((element) => {
    $(element).click(function busqueda(e) {
      seleccion1 = e.target;
      $(".audio")[0].play();  
      if ($(seleccion1).data("infiltrado")) {

        $(seleccion1).addClass("sombreado");
        $(".audio")[1].play();

        seleccion1 = "";
        seleccion1 = "";
        seleccion2 = "";

        puntuacion++;

       

        $("#alerts").html(msgRight);
        $("#alerts").removeClass("alert-dark");
        $("#alerts").removeClass("alert-danger");
        $("#alerts").addClass("alert-info");
        $("#marcador").val(puntuacion);


        if (puntuacion == 3) {
          alert(msgWin + $("#errores").val());
          $(".img").off("click");

          $("#alerts").html("¡Has encontrado a todos los espías!");
          $("#alerts").removeClass("alert-dark");
          $("#alerts").removeClass("alert-danger");
          $("#alerts").removeClass("alert-info");
          $("#alerts").addClass("alert-success");
        }

      } else {
        
            $(".img").off("click");

            $(".audio")[4].play();

            $("#alerts").html(
              "¡Has perdido! No has encontrado a los infiltrados..."
            );

            //Añadir un efecto
            $("#alerts").removeClass("alert-dark");
            $("#alerts").removeClass("alert-success");
            $("#alerts").removeClass("alert-info");
            $("#alerts").addClass("alert-danger");
            contadorErr = 0;

           

      }
    });
  });

});

