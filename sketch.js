var balloon, database;
var position;

function preload()
{
  balloonimg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
  backgroundimg = loadImage("Hot Air Ballon-01.png")
}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(1400,700);

  balloon = createSprite(150,400,10,10);
  balloon.shapeColor = "red";
  balloon.addAnimation("fly",balloonimg);


  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);
}

function draw(){
  background(backgroundimg);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-3);
      balloon.scale = balloon.scale - 0.01;
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+3);
      balloon.scale = balloon.scale + 0.01;
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
