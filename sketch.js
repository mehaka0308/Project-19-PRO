var monkey,monkeyimg,monkeycollided,ground,groundimg,bananaimg,
banana,obst,obstimg,obstgroup,bananagroup,inviground,score,PLAY,
END,gameState;

function preload() {
  monkeyimg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png", "Monkey_06.png","Monkey_07.png","Monkey_08.png", "Monkey_09.png","Monkey_10.png");
  
  monkeycollided = loadAnimation("Monkey_05.png");

  groundimg = loadImage("jungle.jpg");
  
  bananaimg = loadImage("banana.png");
  
  obstimg = loadImage("stone.png");

}

function setup() {
  createCanvas(400, 400);
  
  ground = createSprite(40,100,10,30);
  ground.addImage(groundimg);
  ground.scale = 1;
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  
  monkey = createSprite(60,320,40,30);
  monkey.addAnimation("monkeyimg",monkeyimg)
  monkey.addAnimation("monkeycollided",monkeycollided)
  monkey.scale = 0.15
  
  inviground = createSprite(40,380,800,10);
  inviground.visible = false;
  
  score = 0;
  
  gameState = PLAY;
  
  PLAY = 1;
  
  END = 0;
  
  obstgroup = new Group();
  bananagroup = new Group();

}

function spawnbananas(){
 if (frameCount % 120 === 0){
   var banana = createSprite(390,350,30,40);
   banana.y = Math.round(random(80,200));
   banana.addAnimation("bananaimg",bananaimg);
   banana.scale = 0.08;
   banana.velocityX = -4;
   banana.lifetime = 120;
   banana.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
   bananagroup.add(banana);
  }
}

function spawnobst(){
 if (frameCount % 300 === 0){
   var obst = createSprite(390,340,30,40);
   obst.addAnimation("obstimg",obstimg);
   obst.scale = 0.2;
   obst.velocityX = -4;
   obst.lifetime = 120;
   obst.collide(inviground);
   obst.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
   obstgroup.add(obst);
  }
}

function draw() {
  background(220);
  
  if(keyDown("space")) {
    monkey.velocityY = -13; 
  }
  
  monkey.velocityY = monkey.velocityY + 0.8; 
 
  monkey.collide(inviground)
   
  if(ground.x<0){
    ground.x = ground.width / 2;
  }
  
  spawnobst();
  spawnbananas();
  
  if(monkey.isTouching(bananagroup)){
    bananagroup.destroyEach();
    score = score + 2;
  }
  
  if(monkey.isTouching(obstgroup)){
    monkey.scale = 0.13;
  }
  
  switch(score){
   case 10 : monkey.scale = 0.19; 
   break;
   case 20 : monkey.scale = 0.23;
   break;
   case 30 : monkey.scale = 0.27;
   break;
   case 40 : monkey.scale = 0.31;
   break;
   default : break;
  }  
  
  drawSprites();
  
  textSize(24);
  stroke("white");
  strokeWeight(4);
  fill("black");
  text("Score = " + score,80,100);
}