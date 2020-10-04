var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground, ground2;
var gameState = "play";
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(600, 600);

  monkey = createSprite(50, 295, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  monkey.setCollider("circle", 20, 20, 275)
  
  ground = createSprite(300, 360, 600, 5);  
  ground2 = createSprite(600, 360, 600, 5);

  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  
  if(gameState === "play"){
    ground.velocityX = -(6+3 * score/4);
  
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
    if(ground.x<0){
  
      ground.x = ground.width/2;
    }
  
  ground2.velocityX = -(6+3 * score/4);
  
    if(ground2.x<300){
  
      ground2.x = ground2.width/2;
    }
  
    monkey.collide(ground);
  
    if(keyWentDown("space") && monkey.y >= 290) {
      monkey.velocityY = -20;
    }
  
  if(bananaGroup.isTouching(monkey)){
    
    bananaGroup.destroyEach();
    score = score+2;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    
    monkey.destroy();    
    gameState = "end";
    ground.destroy();
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    ground2.destroy();
  }
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
       
  spawnBananas();
  spawnObstacles();
  }
  else if(gameState === "end"){
    
     stroke("red");
     fill("red");
     textSize(30);
     text("Game Over", 230, 200);
  }  
    
    stroke("red");
    fill("red");
    textSize(30);
    text("Survival Time : "+survivalTime, 200, 450);
    text("Score : "+score, 250, 550);
    drawSprites();
}

function spawnBananas(){

  if(World.frameCount%100 === 0){
    
   banana = createSprite(600, Math.round(random(20, 120)), 20, 20);
   banana.addImage(bananaImage);
   banana.scale = 0.13;
   banana.velocityX = -(6+3*score/2); 
   banana.lifetime = 650;
   bananaGroup.add(banana);
  }
}

function spawnObstacles(){

  if(World.frameCount%100 === 0){
    
   obstacle = createSprite(600, 310, 20, 20);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.3;
   obstacle.velocityX = -(6+3 * score/4); 
   obstacle.lifetime = 650;
   obstacle.setCollider("circle", 20, 20, 220);
   obstacleGroup.add(obstacle);
  }
}