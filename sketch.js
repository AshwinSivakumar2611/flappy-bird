var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,playerBird;
var ground, invisibleGround, groundImage;

var obstaclesGroup;

var score = 0;

var gameOver, restart;
var hitSound;


function preload() {
  //playerBird = loadImage("player.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  hitSound = loadSound("hit.mp3");
}

function setup() {
  createCanvas(1350, 610);

  player = createSprite(50, 180, 20, 40);
  player.setCollider("circle", -2, 0, 23);
  player.debug=true;
  //player.addImage(playerBird);
 
  

  gameOver = createSprite(650, 270);
  gameOver.addImage(gameOverImg);

  restart = createSprite(650, 310);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(400, 610, 1370, 10);
  invisibleGround.x = invisibleGround.width / 2;
  invisibleGround.velocityX = -(6 + 3 * score / 100);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  //obstaclesGroup.debug=true;

  score = 0;
}

function draw() {
  player.debug = true;
  background(0);
  text("Score: " + score, 500, 50);

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    //count = 10;
    invisibleGround.velocityX = -(6 + 3 * score / 100);

    if (keyDown("space")) {
      player.velocityY = -12;
    }
    if (keyWentDown("space")){
      hitSound.play();
    }

    player.velocityY = player.velocityY + 0.8

    if (invisibleGround.x < 0) {
      invisibleGround.x = invisibleGround.width / 2;
    }

    spawnObstacles();

    if (obstaclesGroup.isTouching(player) || invisibleGround.isTouching(player)) {
      gameState = END;
    }
  } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    //set velcity of each game object to 0
    invisibleGround.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      reset();
    }
  }


  drawSprites();
}


function spawnObstacles() {
  if (frameCount % 120 === 0) {

    //generate random obstacles
    var rand = Math.round(random(1, 3));

    if (rand===1){
      var obstacle1 = createSprite(1350,40,30,95); 
      obstacle1.shapeColor="red";
      obstacle1.velocityX = -8;
      obstacle1.lifetime = 300;

      var obstacle1d = createSprite(1350,470,30,420); 
      obstacle1d.shapeColor="red";
      obstacle1d.velocityX = -8;
      obstacle1d.lifetime = 300;

      
      obstaclesGroup.add(obstacle1);
      obstaclesGroup.add(obstacle1d)
    }
    if (rand===2){
      var obstacle2 = createSprite(1350,500,30,300);
      obstacle2.shapeColor="red";
      obstacle2.velocityX = -8;
      obstacle2.lifetime = 300;

      var obstacle2d = createSprite(1350,100,30,200); 
      obstacle2d.shapeColor="red";
      obstacle2d.velocityX = -8;
      obstacle2d.lifetime = 300;


      obstaclesGroup.add(obstacle2);
      obstaclesGroup.add(obstacle2d)
    }
    if (rand===3){
      var obstacle3 = createSprite(1350,575,30,60);
      obstacle3.shapeColor="red";
      obstacle3.velocityX = -8;
      obstacle3.lifetime = 300;

      var obstacle3d = createSprite(1350,150,30,400);
      obstacle3d.shapeColor="red";
      obstacle3d.velocityX = -8;
      obstacle3d.lifetime = 300;

      obstaclesGroup.add(obstacle3);
      obstaclesGroup.add(obstacle3d)
    }

  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  player.x=50;
  player.y=180; 

  obstaclesGroup.destroyEach();

  score = 0;

}