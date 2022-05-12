class Memorama {
  constructor(){
    this.canPlay = false;
    //ninguna carta por defecto abierta
    this.card1 = null;
    this.card2 = null;
   
    //imagenesDisponibles
    this.avaiableImages = [0,1,2,3,4,5]
    //Orden de las imagenes
    this.orderForThisRound = [];
    //selecionamos todas las tarjeta del tablero (board game)-<tienes que castearlo porque el querySelector no devuelve un array
    this.cards = Array.from(document.querySelectorAll(".board-game figure"));
    //maximos pares del juego
    this.maxPairNumber = this.avaiableImages.length;
    
    //iniciar juego
    this.startGame();
    //iniciar nickuser
    this.nickuser=prompt("Introduce tu nickname");
    document.getElementById("nickname").innerHTML = this.nickuser;
    document.getElementById("Rfallos").innerHTML = localStorage.getItem("toperrors");
    document.getElementById("Rnickuser").innerHTML = localStorage.getItem("toplayer");
    


    
  }
  startGame(){
    //inicializamos puntuación
    this.puntuacion = 0;
    //inicializamos fallos
    this.fallos = 0;
    this.foundPairs=0;
    //Ordenamos de forma aleatoria con la funcion
    this.setNewOrder();
    //Ponemos las imagenes en el nuevo array
    this.setImagesInCards();
    //sbrir tarjetas
    this.openCards();
  }
  setNewOrder(){
    //Rellenamos el orden aleatoriamente primero duplicas el aaray y luego haces ramdon
    this.orderForThisRound = this.avaiableImages.concat(this.avaiableImages);
    this.orderForThisRound.sort(() => Math.random() - 0.5 );
  }
  setImagesInCards(){
    for (const key in this.cards) {
        const card= this.cards[key];
        const image = this.orderForThisRound[key];
        //tienes que acerder al hijo 1 que es el que contiene la imagen (no la back)
        const imgLabel = card.children[1].children[0];
        card.dataset.image = image;
        imgLabel.src = `./images/${image}.jpg`;
    }
  }
  openCards(){
      //añadimos la clase opened a todas.
      this.cards.forEach (card => card.classList.add("opened"));
      //establecemos un tiempo para que se cierren
      setTimeout(() => {
        this.closeCards();
      }, 3000);
  }
  closeCards(){
    //eliminamos la clase opened de todas las clases
    this.cards.forEach(card => card.classList.remove("opened"));
    //añadir el click a cada tarjeta
    this.addClickEvents();
    this.canPlay = true;
  }

  //LOGICA DEL JUEGO 
  addClickEvents(){
    //se lo añades al contexto de la clase no del evento de ahí el bind
    this.cards.forEach(card=>card.addEventListener("click",this.flipCard.bind(this)));
  }
  removeClickEvents(){
    this.cards.forEach(card=>card.removeEventListener("click",this.flipCard.bind(this)));
 
  }
  flipCard(e){
    const clickedCard = e.target;
    if (this.canPlay && !clickedCard.classList.contains("opened")){
      clickedCard.classList.add("opened");
      //le pasas el dataset con el id de la targeta selecionada
      this.checkPair(clickedCard.dataset.image);
    }
  }
  checkPair(image) {
    if(!this.card1) this.card1 = image;
    else this.card2 = image;
    if(this.card1 && this.card2){
      if(this.card1 == this.card2) {
        this.puntuacion++;
        document.getElementById("score").innerHTML = "Score "+this.puntuacion+" pts";
        
        this.canPlay = false;
        setTimeout(this.checkIfWon.bind(this),300);
      }
      else {
        this.fallos++;
        document.getElementById("errors").innerHTML = this.fallos+" Errors";
        //para que no se pueda abrir otra carta
        this.canPlay = false;
        //mter tiempo para cargar la animacion, referenciar a this no a settimeout
        setTimeout(this.resetOpenedCards.bind(this),800);
        
      }
    }
  }
  resetOpenedCards(){
    const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
    const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);

    firstOpened.classList.remove("opened");
    secondOpened.classList.remove("opened");

    this.card1 = null;
    this.card2 = null;
    this.canPlay = true;
  }
  checkIfWon(){
    this.foundPairs++;

    this.card1 = null;
    this.card2 = null;
    this.canPlay = true;
    if(this.maxPairNumber == this.foundPairs) {
      alert("Ganaste!");
      //TODO 
    
      if(localStorage.getItem("toperrors") == null || this.fallos < Number(localStorage.getItem("toperrors"))){
        localStorage.setItem("toplayer", this.nickuser) ;
        localStorage.setItem("toperrors", this.fallos);
        document.getElementById("Rfallos").innerHTML = this.fallos;
        document.getElementById("Rnickuser").innerHTML = this.nickuser;
        alert(this.nickuser + localStorage.getItem("toplayer"));
      }


      this.setNewGame();
    }
  }
  setNewGame(){
    this.removeClickEvents();
    this.cards.forEach(card => card.classList.remove("opened"));
    setTimeout(this.startGame.bind(this),1000);
  }
}
//Cuando el documento se carge por completo
document.addEventListener("DOMContentLoaded", () =>{
  new Memorama();
});