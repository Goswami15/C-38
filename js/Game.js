class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  end(){
    
    console.log(player.rank);
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1_img);

    car2 = createSprite(300,200);
    car2.addImage(car2_img);

    car3 = createSprite(500,200);
    car3.addImage(car3_img);

    car4 = createSprite(700,200);
    car4.addImage(car4_img);

    cars = [car1, car2, car3, car4];


  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    player.getCarsAtEnd();
    console.log(carsAtEnd)
    if(allPlayers !== undefined){
      background(track2_img);

  image(track1_img,0,-displayHeight*4,displayWidth,displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 225;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("red");
          stroke(10);
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=100
      player.update();
    
    }


if(player.distance>4150){
  gameState=2;
  player.rank=player.rank+1;
  player.update()
  Player.updateCarsAtEnd(player.rank);
}



    drawSprites();
  }


showLeaderBoard(){
  
  background(ground_img)
  var leaderBoard = createElement("h1");
  leaderBoard.position(displayWidth/2,50);
  leaderBoard.html("Leaderboard");
  leaderBoard.style("color", 'yellow');

  var ranks = []

  for (var p in allPlayers){
    ranks.push({name: allPlayers[p].name, rank : allPlayers[p].rank})
  }

  var y= 200;


  for (var r in ranks){
    var individualRankDisplay = createElement("h2");
    individualRankDisplay.position(displayWidth/2, y);
    individualRankDisplay.style("color", 'white');
    y = y+100;
    ranks.sort(function(a, b){return a.rank - b.rank}); 
  
    individualRankDisplay.html(ranks[r].name +" : "+ranks[r].rank )
  }

}
  
}

