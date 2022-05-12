//rutas
const pollo = "Imagenes/pollo.jpg";
const oveja = "Imagenes/oveja.jpg";
const aldeano = "Imagenes/aldeano.jpg";
const zombi = "Imagenes/zombi.jpg";
const steve = "Imagenes/steve.jpg";
const enderman = "Imagenes/enderman.jpg";
const creeper = "Imagenes/creeper.jpg";
const cerdo = "Imagenes/cerdo.jpg";
const tnt = "Imagenes/tnt.jpg";
const reverso = "Imagenes/reverso.jpg";
const explosion = new Audio("Audio/tntExplosion.mp3");

//variable para guardar la carta que se seleccionó anteriormente
var cAnterior = "";

//puntos y errores
var puntos = 0;
var errores = 0;


//obtener el storage del ranking y el idioma
var topJugador = localStorage.getItem("topJugador");
var topErrores = localStorage.getItem("topErrores");
var idioma = localStorage.getItem("idioma");

//Esta función se ejecuta cuando se hace click en una carta.
function voltear(elem, todas, jugador, datos, jqu){

    //se oculta la carta por (0,005s)
    jqu.fadeOut(50,function(){
        //se cambia la carta
        jqu.attr("src", datos).delay(50);
   

        //si la carta ya está emparejada no hace nada
        if(elem.className == "done"){

        }
        //si se selecciona una carta sin haber otra seleccionada
        else if(cAnterior==""){
            elem.className = "selected";
            cAnterior=elem;
        }
        //si se selecciona la misma carta que hay, se vuelve a poner boca abajo.
        else if(cAnterior==elem){
            elem.className="img";
            cAnterior="";
            elem.src = reverso;
        }
        //si se selecciona otra carta con la misma imagen se marca como done
        else if(cAnterior.src==elem.src && cAnterior.id!=elem.id){
            elem.className="selected";
            puntos += 1;
            setTimeout(() => {
                cAnterior.className = "done";
                cAnterior = "";
                elem.className = "done";    
                //cuando los puntos llegan a 7 has ganado        
                if(puntos == 7){
                    //se informa al jugador de que ha ganado
                    alert("Has ganado!!");
                    //si no había nadie en el ranking se guarda                           
                    if(topJugador == null){
                        localStorage.setItem("topJugador", jugador);
                        localStorage.setItem("topErrores", errores);
                    }
                    //si había alguien y tenía más errores o los mismos se cambia el ranking
                    else{
                        if(Number(localStorage.getItem("topErrores")) >= errores){
                            localStorage.setItem("topJugador", jugador);
                            localStorage.setItem("topErrores", errores);
                        }
                    }

                    //se vuelve a empezar el juego
                    rejugar();
                }
            }, 500);
                
        }

        //si se selecciona otra carta con una imagen distinta se da la vuelta otra vez
        else if(cAnterior.src != elem.src){
            elem.className="selected";
            errores +=1;
            setTimeout(() => {
                cAnterior.src=reverso;
                cAnterior.className = "img";
                cAnterior="";
                elem.src=reverso;
                elem.className="img";            
            }, 500);        
        }
    });

    //se vuelve a mostrar la carta cambiada
    jqu.fadeIn(50);   

    //si se selecciona la tnt se dan la vuelta a todas las cartas
    if(datos == tnt){
        puntos = 0;
        explosion.play();
        setTimeout(() => {
            cAnterior.src=reverso;
            cAnterior.className = "img";
            cAnterior="";
            elem.src=reverso;
            elem.className="img";
            for(i=0;i<todas.length;i++){
                todas[i].src = reverso;
                todas[i].className = "img";
            }
        }, 500);
    }

}

//barajea las cartas
function barajear(){
    var cartas = [];
    var baraja = [oveja,oveja,aldeano,aldeano,zombi,zombi,steve,steve,enderman,enderman,creeper,creeper,cerdo,cerdo,tnt];
    for(i=0; i < 15;i++){
        var num = Math.floor(Math.random() * (baraja.length - 0) + 0);
        cartas.push(baraja[num]);
        baraja.splice(num,1);
    }
    return cartas;
}

//actualiza el marcador
function actMarcador(aciertos, fallos){
    console.log(errores);
    aciertos.value = "Aciertos: "+ puntos;
    fallos.value = "Fallos: " + errores;
}




