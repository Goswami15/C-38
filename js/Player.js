class Player {
  constructor(){
    this.index = null;
    this.distance = 10;
    this.name = null;
    this.rank=null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      rank : this.rank
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  getCarsAtEnd(){
    var carsAtEndRef = database.ref('carsAtEnd');
    carsAtEndRef.on("value",(data)=>{
      this.rank = data.val();
      carsAtEnd = data.val();
    })
  }

  static updateCarsAtEnd(rank){
    database.ref('/').update({
      carsAtEnd: rank
    });
  }


}


