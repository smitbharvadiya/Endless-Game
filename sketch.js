var gameState, START = 1,
  PLAY = 2,
  END = 0
var iornMan, iornMan_Image;
var missile, missile_Image, missleGroup;
var missile2,missileImg,missile2Group;
var coin, coin_Image, coinsGroup;
var side1, side2;
var cloudsGroup,cloud,cloudImage,land;
var score = 0;
var startGame,StartImg;
var restart,restartImg;
var landImg;
//giving default gameState
gameState = START;

function preload() {
  //loading images
  iornMan_Image = loadImage("bheem1.png");
  restartImg = loadImage("Start.png");
  coins_Image = loadImage("laddu.png");
  cloudImage = loadImage("cloud.png");
  missile_Image = loadImage("1.png");
  StartImg = loadImage("Start.png");
  missileImg=loadImage("2.png");
  
}

function setup() {
  //creating canvas
  createCanvas(400,400);
  
  //creating iorn man
  iornMan = createSprite(200, 360, 10, 10);
  iornMan.addImage(iornMan_Image);
  iornMan.scale = 0.08;
  iornMan.debug=true;
  
  startGame = createSprite(200,200,50,50);
  startGame.addImage(StartImg);
  startGame.scale=0.06;
  startGame.visible=true;
  
  restart = createSprite(200,250,50,50);
  restart.addImage(restartImg);
  restart.scale=0.06;
  restart.visible=false;
  
  //creating sides
  side1 = createSprite(-7, 200, 10, 400);
  side1.visible = false;
  side2 = createSprite(410, 200, 10, 400);
  side2.visible = false;

  //creating group
  coinsGroup = new Group();
  missileGroup = new Group();
  cloudsGroup = new Group();
  missile2Group = new Group();
  
}
n = 0

function draw() {
  background("lightblue");

  if (gameState === START) {
    if (keyWentUp("space")) {
      gameState = PLAY;
    }
  } else if (gameState === PLAY) {
    
     startGame.destroy();
    //making background move
    camera.position.y = iornMan.y - 167
    iornMan.velocityY = -10
    side1.y = iornMan.y-200
    side2.y = iornMan.y-200

    //spawn Missles
    if (frameCount % 85 === 0) {
      spawnMissile();
    }
    //spawn Missles
    if (frameCount % 60 === 0) {
      spawnMissile2();
    }
    
    //spawn Coins
    if (frameCount % 40 === 0) {
      spawnCoins();
    }
    
    //spawn Clouds
      spawnClouds();

    //making iorn man move
    if (keyDown(RIGHT_ARROW)) {
      iornMan.x += 5.5;
    }

    if (keyDown(LEFT_ARROW)) {
      iornMan.x -= 5.5;
    }

    iornMan.bounce(side1);
    iornMan.bounce(side2);
    //iornMan.debug = true;
//iornMan.setCollider("rectangle",250,200,200,800);
  //ironMan.setCollider("rectangle",-30,10,400,800);
    //scoreBoard

    if (iornMan.isTouching(coinsGroup)) {
      score += 1;
      coinsGroup.destroyEach();
    }
    
    if (iornMan.isTouching(missileGroup) || iornMan.isTouching(missile2Group)) {
      
      iornMan.visible = true;
      missileGroup.destroyEach();
      missile2Group.destroyEach();
      coinsGroup.destroyEach();
      cloudsGroup.destroyEach();
      gameState = END;
    }
  } else if (gameState === END) {
     
    restart.visible=true;
    if (keyWentUp("r")) {
      gameState = PLAY
      score = 0;
      iornMan.visible = true;
    }
  }
  
    if(mousePressedOver(startGame)) {
      gameState = PLAY;
    }
    if(mousePressedOver(restart)) {
      gameState = PLAY;
      score=0;
    }
 

  drawSprites();

  //Displaying instructions
  if (gameState === START) {
   
    stroke("black");
    fill("black");
    textSize(30);
    text("CHHOTA BHEEM", 80,65);
    stroke("black");
    fill("black");
    textSize(25);
    text("Press Start Button To Play", 55,100);
  }
   
  
  if (gameState === PLAY || gameState === END) {
    stroke("black");
    fill("black");
    textSize(20);
    text("Score: " + score, 150, iornMan.y - 330)
  }

  if (gameState === END) {
   //camera.y
    noStroke();
    fill(1);
    textSize(50);
    text("GAME OVER!☠", 20,camera.y - 15 );
    camera.position.y = restart.y- 50;
  }
}

function spawnMissile() {
  missile = createSprite(0, iornMan.y - 400, 10, 10);
  missile.addImage("coin", missile_Image);
  missile.x = random(20, 370);
  missile.scale = 0.1;
  missile.bounce(missileGroup)
  missile.setCollider("circle",0,0,280);
  missile.lifetime = 50;
  
  missileGroup.add(missile)
}

function spawnMissile2() {
missile2 = createSprite(0, iornMan.y - 400, 10, 10);
missile2.addImage("coin", missileImg);
missile2.x = random(20, 370);
missile2.scale = 0.1;
missile2.bounce(missile2Group);
missile2.setCollider("circle",0,0,280);
missile2.lifetime = 50;

  missile2Group.add(missile2)
}

function spawnCoins() {
  coin = createSprite(0, iornMan.y - 400, 10, 10);
  coin.addImage("coin", coins_Image);
  coin.x = random(20, 370);
  coin.scale = 0.08;
  coin.bounce(missileGroup)
  coin.setCollider("circle",0,0,280);
  coin.lifetime = 50;

  coinsGroup.add(coin)
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 15=== 0) {
     cloud = createSprite(600,iornMan.y - 400,40,10);
    cloud.x = Math.round(random(10,390));
    cloud.addImage(cloudImage);
    cloud.scale = random(0.2,0.1);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = iornMan.depth;
    iornMan.depth += 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

