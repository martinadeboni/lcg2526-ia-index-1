let xMax = 400;
let yMax = 600;

let xRocket = xMax/2;
let yRocket = yMax*0.6;

let table;
let star_img;
let stars_valid = []; // le parentesi quadre lo definiscono come array

function isStarSizevalid(value){
  //se il dato in ingresso è corretto o meno
  //restituire un booleano
  return value>0; 
}

function preload() {
  table = loadTable("stars.csv", "csv", "header");
  star_img = loadImage("star.png");
}


function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);
  // filtrare i dati
  //tramite isStarSizedvalid

  //applichiamo la funzioe di filtro
  //scorriamo i valori con un ciclo e filtriamo
  for(let i=0; i < table.getRowCount(); i++){
    let star_value = table.getNum(i,"starSize");
    if(isStarSizevalid(star_value)){
      stars_valid.push(star_value);
    }
  }
}

function drawStarsFromFile() {
  for(let k = 0; k < table.getRowCount(); k++) {
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);
    let starSize = table.getNum(k, "starSize")
    image(star_img, starX, starY, starSize, starSize);
  }
}


function drawRocket(xRocket, yRocket) {

  push();               // save current drawing settings
  // rocket body
  fill(220);            // light gray
  stroke(40);           // dark outline
  strokeWeight(2);
  rectMode(CENTER);     // rectangle drawn from its center
  rect(xRocket, yRocket+30, 80, 180, 20); // body rectangle with rounded corners
  // nose cone
  fill(200, 40, 40);    // red
  triangle(xRocket-40, yRocket-60, xRocket+40, yRocket-60, xRocket, yRocket-120); // triangle on top
  // window (circle)
  fill(40, 150, 220);   // blue glass
  stroke(255);          // white border
  strokeWeight(3);
  ellipse(xRocket, yRocket+20, 48, 48); // window circle
  // fins on the left and right
  stroke(40);
  strokeWeight(2);
  fill(180, 30, 30);    // dark red
  triangle(xRocket-40, yRocket+90, xRocket-80, yRocket+130, xRocket-20, yRocket+90); // left fin
  triangle(xRocket+40, yRocket+90, xRocket+80, yRocket+130, xRocket+20, yRocket+90);    // right fin
  pop(); // restore settings (so it won’t affect other drawings)
}


function moveRocket(yRocket, step=1) {

  yRocket = yRocket - step;
  let soglia = -(yMax * 0.6);
  if (yRocket < soglia) {
    yRocket = yMax;
  }
  return yRocket;
}

function draw() {
  background("#C0E1FC");

  fill(0); //bianco
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20);
     //disegnare la stella più piccola
     //e la stella più grossa
     image(star_img,50,50,min(stars_valid),min(stars_valid));
     image(star_img,50,50,max(stars_valid),max(stars_valid));

  drawStarsFromFile();
  drawRocket(xRocket, yRocket); 

  xRocket = (xRocket +1) % xMax;
  yRocket = moveRocket(yRocket); 

}
