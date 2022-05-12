<<<<<<< HEAD:Juego de cartas v.2/js/scriptInfiltrado.js
const opciones2 = ["bart", "bart", "bart", "bart", "bart", "bart", "maggie", "homer", "flanders", "bart", "bart", "bart", "bart", "bart", "bart"];
function barajarInfiltrado(){
    $(cartas).off("click");

        if ($(cartas).data("name") != null) {
            $(cartas).removeData("name");
        }
        const arrayOpciones2 = opciones2.sort(function () { return Math.random() - 0.5 });
        for (let i = 0; i < arrayOpciones2.length; i++) {
            $(cartas[i]).data("name", arrayOpciones2[i]);
            console.log($(cartas[i]).data("name"));

        }

        $(".carta").on("click", mostrarImagenes);
        $(".carta").removeClass("prevent-click");

        $(cont).html(0);
}

function erroresInfiltrado(cartas){
    
    if($(cartas[0]).data("name") == $(cartas[1]).data("name")){
        $(barraInformativa).addClass("alert-danger");
        $(barraInformativa).html(errormsg);
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }else{
        cont++;
        $(cont).html(cont);
        cartas.forEach(element => {
            $(element).addClass("correcta").effect("highlight", { color: " #1AAE00 " }, "slow");
            $(element).off("click");
        });
        if(cont == 3){
            $(barraInformativa).addClass("alert-success");
            $(barraInformativa).html(win);
            $('.alert').alert();
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }
    }
    
}
    


=======
const opciones = ["bart", "bart", "bart", "bart", "bart", "bart", "maggie", "homer", "flanders", "bart", "bart", "bart", "bart", "bart", "bart"];
function barajarInfiltrado(){
    $(cartas).off("click");

        if ($(cartas).data("name") != null) {
            $(cartas).removeData("name");
        }
        const arrayOpciones2 = opciones2.sort(function () { return Math.random() - 0.5 });
        for (let i = 0; i < arrayOpciones2.length; i++) {
            $(cartas[i]).data("name", arrayOpciones2[i]);
            console.log($(cartas[i]).data("name"));

        }

        $(".carta").on("click", mostrarImagenes);
        $(".carta").removeClass("prevent-click");

        $(cont).html(0);
}

    


function erroresInfiltrado(){
    let cont = parseInt($("#errores").text(), 10);
    if(cont == 3){
        $(barraInformativa).addClass("alert-danger");
        $(barraInformativa).html(errormsg);
    }
}
    


>>>>>>> afbfe380ad37b9d4965b68a8ed63d9a1dc3af9ca:js/scriptInfiltrado.js
