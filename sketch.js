var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var car1_img,car2_img,car3_img,car4_img;
var ground_img;
var track1_img,track2_img;
var carsAtEnd;


function preload(){
  car1_img=loadImage("images/car1.png");
  car2_img=loadImage("images/car2.png");
  car3_img=loadImage("images/car3.png");
  car4_img=loadImage("images/car4.png");
  track1_img=loadImage("images/track.jpg");
  track2_img=loadImage("images/track.png");
  ground_img = loadImage("images/ground.png");
}



function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState===2){
    game.end();
  }
  console.log("cars At End " + carsAtEnd)

  if(carsAtEnd ===4){
    clear();
    game.showLeaderBoard()
  }
}