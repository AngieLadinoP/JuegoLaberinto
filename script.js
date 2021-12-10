//Variable del lienzo
let canvas;
//Variable del contexto
let ctx;
//FPS frames por segundo
const FPS = 50;

//Ancho de la ficha
let anchoF = 50;
let altoF = 50;

//Determinar qué es cada ficha: tipo de elemento dentro del juego
let pasto = "#228B22"
let agua = "#1E90FF"
let tierra = "#D2691E"

//Determinar el escenario con matrices. Las matrices son Array dentro de otro Array. Cada una representa una posicion en el tablero
let escenario = [
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Posición 0
    [1, 2, 0, 0, 1, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0], //Posición 1
    [1, 2, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0], //Posición 2
    [1, 2, 2, 2, 0, 0, 2, 1, 1, 1, 1, 2, 2, 2, 0], //Posición 3
    [1, 1, 1, 2, 0, 0, 2, 2, 1, 1, 1, 1, 1, 2, 0], //Posición 4
    [1, 1, 1, 2, 2, 0, 0, 2, 2, 2, 2, 1, 1, 2, 0],
    [1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 1, 1, 2, 0],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 2, 0],
    [1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 2, 1, 2, 2, 0],
    [1, 1, 1, 2, 2, 2, 2, 2, 2, 0, 2, 1, 2, 0, 0],
    [1, 1, 1, 2, 1, 1, 1, 1, 2, 0, 2, 1, 2, 0, 0],
    [1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 0, 0],
    [1, 0, 2, 2, 2, 0, 1, 1, 1, 2, 1, 1, 2, 0, 0],
    [1, 0, 0, 2, 0, 0, 1, 0, 2, 2, 0, 1, 2, 2, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 0, 0]
]

//Construir excenario
function dibujarEscenario() {
    let color;
    // Recorer el alto (y) del escenario para que entre a cada cero para reemplazarlo por un color
    for (y = 0; y < escenario.length; y++) {
        // Recorer el ancho (x) del escenario para que entre a cada cero para reemplazarlo por un color
        for (x = 0; x < escenario[y].length; x++) {

            //Comparar para reemplazar la ficha
            if (escenario[y][x] == 0) {
                color = pasto;
            }
            if (escenario[y][x] == 1) {
                color = agua;
            }
            if (escenario[y][x] == 2) {
                color = tierra;
            }
            ctx.fillStyle = color //Colorear de acuerdo a lo establecido en los if
            ctx.fillRect(x * anchoF, y * altoF, anchoF, altoF)
        }
    }
}

//Declarar función del personaje  ; esto va con POO
let Jugador = function() { //Todo lo que es propio del jugador va con this
    // Definir la posición del jugador. Estos son los atributos
    this.x = 1;
    this.y = 0;
    this.color = "black";

    //Métodos. Acciones que realiza el objeto creado
    this.dibuja = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * anchoF, this.y * altoF, anchoF, altoF)
    }

    ///Método para subir la ficha o el jugador  solo con if dentro de las funciones 
    /* this.arriba = function() {
        if (escenario[this.y - 1][this.x] == 2) {
            this.y--;
        }
    }
    this.abajo = function() {
        if (escenario[this.y + 1][this.x] == 2) {
            this.y++;
        }
    }
    this.izquierda = function() {
        if (escenario[this.y][this.x - 1] == 2) {
            this.x--
        }
    }
    this.derecha = function() {
        if (escenario[this.y][this.x + 1] == 2) {
            this.x++
        }
    } */

    this.arriba = function() {
        if (this.margenes(this.x, this.y - 1) == false)
            this.y--;
    }
    this.abajo = function() {
        if (this.margenes(this.x, this.y + 1) == false)
            this.y++;
    }
    this.izquierda = function() {
        if (this.margenes(this.x - 1, this.y) == false)
            this.x--
    }
    this.derecha = function() {
        if (this.margenes(this.x + 1, this.y) == false)
            this.x++
    }

    // Función colisiones 
    this.margenes = function(x, y) {
        let colisiones = false
        if (escenario[y][x] == 0 || escenario[y][x] == 1) {
            colisiones = true
        }
        return (colisiones)
    }

}


//Crear una variable global para el personaje
let protagonista;


// Esta función activa todo
function inicializa() {
    canvas = document.getElementById("canva")
    ctx = canvas.getContext("2d")

    //Crear el jugador es una instancia de jugador 
    protagonista = new Jugador()

    //Eventos: estar pendientes de situaciones que ocurran 
    //En este caso se necesita ssaber que tecla se presiona
    document.addEventListener("keydown", function(tecla) {
        //Este ejempplo es con el código correspondiente a la tecla pero ahora se hace es con el nombre 
        if (tecla.key == "ArrowUp" || tecla.key == "w") {
            protagonista.arriba()
        }
        if (tecla.key == "ArrowDown" || tecla.key == "s") {
            protagonista.abajo()
        }
        if (tecla.key == "ArrowLeft" || tecla.key == "a") {
            protagonista.izquierda()
        }
        if (tecla.key == "ArrowRight" || tecla.key == "d") {
            protagonista.derecha()
        }
    })

    //Cantidad de tiempo que va a usar el personaje para moverse
    setInterval(function() { //Esto es para que el código funcione mejor con el personaje 
        principal()
    }, 1000 / FPS)

}

// Esta finción centraliza las demás funciones
function principal() {
    dibujarEscenario();
    protagonista.dibuja(); /* Hay que tener en cuenta que se dibije primero el escenario y luego el protagonista */
}