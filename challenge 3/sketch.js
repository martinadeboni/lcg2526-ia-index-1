let xMax = 400; 
let yMax = 600; 

let xrocket = xMax/2; 
let yrocket = yMax*0.6;
let clouds = [];
let flowers = [];
let birdX = 40;
let birdY = 100;
let birdSpeed = 2;
let birdDirection = 1;

function setup() {
  createCanvas(xMax,yMax);
  angleMode(DEGREES);

  //creo i fiori
  flowers = [];
  for (let i = 0; i < 20; i++) {
  flowers.push({
    x: random(width),
    y: random(height * 0.75, height - 20),
    size: random(8, 15),
    col: color(random(255), random(255), random(255))
  });
}

  // creo qualche nuvola iniziale
  for (let i = 0; i < 5; i++) {
    clouds.push({
      x: random(width),
      y: random(50, 150),
      size: random(40, 70),
      speed: random(0.3, 1) // velocità di movimento
    });
  }
}

function draw() {
  background("#C0E1FC");
   // mostrare un testo bianco che dice le coordinate del mouse sul foglio da disegno
  fill(255); // bianco
  textSize(20);
  //stringa,x,y
  text("mouseX: " + mouseX + ",\
    mouseY: " + mouseY, 20,20);

  // prato
  stroke(34,150,200);
  fill(34, 139, 34);
  rect(0, height * 0.7, width, height * 0.3);

  //creo i fiori
    for (let f of flowers) {
  fill(f.col);
  noStroke();
  ellipse(f.x, f.y, f.size); // petalo principale
  ellipse(f.x + 5, f.y, f.size);
  ellipse(f.x - 5, f.y, f.size);
  ellipse(f.x, f.y + 5, f.size);
  ellipse(f.x, f.y - 5, f.size);
  fill(255, 200, 0);
  ellipse(f.x, f.y, f.size / 2); // centro giallo
}

  // sole
  drawSun(80, 80, 40);

  // nuvole
  for (let c of clouds) {
    drawCloud(c.x, c.y, c.size);
    c.x += c.speed; // movimento verso destra
    if (c.x - c.size > width) { // se esce, ricompare a sinistra
      c.x = -c.size;
      c.y = random(50, 150);
    }
  }

  birdX += birdSpeed * birdDirection;
birdY = 100 + sin(frameCount * 2) * 10; // movimento su e giù

// cambio direzione ai bordi
if (birdX > width - 30 || birdX < 30) {
  birdDirection *= -1;
}

// disegno l’uccellino
// uccellino stilizzato
push();
translate(birdX, birdY);
stroke(0);
strokeWeight(2);
fill(80);
ellipse(0, 0, 20, 12); // corpo
triangle(10, 0, 18, -3, 18, 3); // becco
fill(255);
ellipse(-4, -3, 4, 4); // occhio bianco
fill(0);
ellipse(-4, -3, 2, 2); // pupilla
pop();

  // asta bandiera
  fill(100);
  rect(100, height * 0.30, 7, height * 0.40);

  // bandiera italiana (più grande)
  drawItalianFlag(107, height * 0.30, 130, 100);

  // alberi (più piccoli)
  drawRoundTree(250, height * 0.61, 0.6);
  drawRoundTree(320, height * 0.60, 0.7);
  drawRoundTree(500, height * 0.79, 0.65);
}

// --- SOLE ---
function drawSun(x, y, r) {
  push();
  translate(x, y);
  stroke(255, 223, 0);
  strokeWeight(3);
  noFill();
  let rays = 20;
  for (let i = 0; i < rays; i++) {
    let angle = i * (360 / rays) + frameCount;
    let x1 = cos(angle) * (r + 10);
    let y1 = sin(angle) * (r + 10);
    let x2 = cos(angle) * (r + 20);
    let y2 = sin(angle) * (r + 20);
    line(x1, y1, x2, y2);
  }
  noStroke();
  fill(255, 223, 0);
  ellipse(0, 0, r * 2);
  pop();
}

// --- BANDIERA ---
function drawItalianFlag(x, y, w, h) {
  let stripeWidth = w / 3;

  // tessuto grigio chiaro
  drawFlagStripe(x, y, w, h, color(220));

  // verde
  drawFlagStripe(x, y, stripeWidth, h, color(0, 146, 70));
  // bianco
  drawFlagStripe(x + stripeWidth, y, stripeWidth, h, color(255));
  // rosso
  drawFlagStripe(x + stripeWidth * 2, y, stripeWidth, h, color(206, 43, 55));
}

function drawFlagStripe(x, y, w, h, c) {
  noStroke();
  fill(c);

  beginShape();
  for (let i = 0; i <= 10; i++) {
    let px = x + (i * w) / 10;
    let py = y + sin(frameCount * 2 + i * 0.8) * 5; // effetto onda
    vertex(px, py);
    vertex(px, py + h);
  }
  endShape(CLOSE);
}

// --- ALBERI ROTONDI ---
function drawRoundTree(x, y, scaleFactor) {
  push();
  scale(scaleFactor);
  stroke(50,50,20);
  fill(139, 69, 19);
  rect(x / scaleFactor - 10, y / scaleFactor, 20, 90);
  fill(34, 139, 34);
  ellipse(x / scaleFactor, y / scaleFactor - 20, 100, 80);
  ellipse(x / scaleFactor - 30, y / scaleFactor - 10, 60, 60);
  ellipse(x / scaleFactor + 30, y / scaleFactor - 10, 60, 60);
  ellipse(x / scaleFactor, y / scaleFactor - 50, 70, 70);
  pop();
}

// --- NUVOLE ---
function drawCloud(x, y, size) {
  fill(255);
  noStroke();
  ellipse(x, y, size, size * 0.7);
  ellipse(x + size * 0.4, y - 10, size * 0.8, size * 0.6);
  ellipse(x - size * 0.4, y - 10, size * 0.8, size * 0.6);
  ellipse(x, y - 15, size, size * 0.6);
}