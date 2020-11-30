var dog, happyDog, database, foodS, foodStock;
var dogImg, happydogImg;

function preload() {
    dogImg = loadImage("Dog.png");
    happydogImg = loadImage("happydog.png");
}

function setup() {
    createCanvas(500,500);
    database = firebase.database();

    dog = createSprite(250,300,150,150);
    dog.addImage(dogImg);
    dog.scale = 0.3;

    foodStock = database.ref('Food');
    foodStock.on("value",readStock);

}

function readStock(data) {

    foodS = data.val();

}

function draw() {
    background(46,139,87);

    if(keyWentDown(UP_ARROW)) {

        writeStock(foodS);

        dog.addImage(happydogImg);
        dog.scale = 0.3;
        
    }

    drawSprites();

    textSize(30);
    fill("black");
    text("Press Up Arrow To Feed The Dog",10,30);
    text("Food Remaining : "+foodS,10,70);

}

function writeStock(x) {

    if (x <= 0) {

        x = 0;

    }
    else {

        x = x - 1;

    }

    database.ref('/').update({

        Food: x

    });
}