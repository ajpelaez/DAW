function cargarRanking() {
    // Carga la lista de mejores jugadores guardado en localStorage
    let rankingJugadores = getRanking();

    let celdas = "";


    // Por cada jugador de la lista crea una fila para la tabla
    rankingJugadores.forEach(jugador => {
        celdas += `
                <tr>
                    <td class="table-warning">${jugador.nombre}</td>
                    <td class="table-success"><i class="fa-solid fa-circle-check"></i>     ${jugador.puntos}</td>
                </tr>
            `
    });


    
    // Carga la tabla
    $("#jugadores").html(celdas);
}



function comparadorPorPuntos(a, b) {
    if (a.puntos < b.puntos) {
        return -1;
    }

    if (a.puntos > b.puntos) {
        return 1;
    }

    return 0;
}



function getRanking() {
    // Si el ranking no existe, crea uno predeterminado
    if (localStorage.getItem("ArrayRanking") == null) {
        let arrayRanking = [{
                "nombre": "Jugador 1",
                "puntos": 10
            },
            {
                "nombre": "Jugador 2",
                "puntos": 20
            },
            {
                "nombre": "Jugador 3",
                "puntos": 40
            },
            {
                "nombre": "Jugador 4",
                "puntos": 60
            },
            {
                "nombre": "Jugador 5",
                "puntos": 80
            },
        ]


        // Guarda este array de objetos en localStorage
        localStorage.setItem("ArrayRanking", JSON.stringify(arrayRanking));
    }


    return JSON.parse(localStorage.getItem("ArrayRanking"));
}


function comprobarRanking() {
    let rankingJugadores = getRanking();

    // Añade nuestra puntuación y nombre a la lista
    rankingJugadores.push({
        "nombre": nombre,
        "puntos": errores
    })

    // Ordenamos la lista de jugadores según sus puntos
    rankingJugadores.sort(comparadorPorPuntos);

    // Si la lista supera los 5 elementos, removemos el último
    if (rankingJugadores.length == 6) {
        rankingJugadores.pop();
    }

    // Guarda este array de objetos en localStorage
    localStorage.setItem("ArrayRanking", JSON.stringify(rankingJugadores));

    // Vuelve a cargar el ranking
    cargarRanking();
}