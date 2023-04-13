let grow;
let vTime;
let v0;

function setup() {
  cnv = createCanvas(windowHeight/6 , windowHeight/6 );

  cnv.parent('sketch-holder-header');

  cnv.mouseOver(mOver);
  cnv.mouseOut(mOut);

  grow = null;
  angleMode(DEGREES);
}

function draw() {
  background(255);
  console.log('draw ' + grow);

  v0 = windowHeight/24

  if (grow == true) {
    vTime = abs(sin(frameCount % 1000)*v0*3)
  } else if (grow == null) {
    vTime = abs(sin(frameCount % 1000)*v0)
  }

  let v1 = map(vTime, 0, v0, 0, v0-25, true)

  drawArrow(createVector(v0, v0), createVector(-v1, -v1), 'black');
  drawArrow(createVector(v0, 2*v0), createVector(-v1, 0), 'black');
  drawArrow(createVector(v0, 3*v0), createVector(-v1, v1), 'black');
  drawArrow(createVector(2*v0, v0), createVector(0, -v1), 'black');
  drawArrow(createVector(2*v0, 3*v0), createVector(0, v1), 'black');
  drawArrow(createVector(3*v0, v0), createVector(v1, -v1), 'black');
  drawArrow(createVector(3*v0, 2*v0), createVector(v1, 0), 'black');
  drawArrow(createVector(3*v0, 3*v0), createVector(v1, v1), 'black');
  
  noFill();
  strokeWeight(10);
  ellipse(2*v0, 2*v0, v0*1.3, v0*1.15)
}

function mOver(){
  grow = true;
}

function mOut(){
  grow = false;
  vTime = abs(sin(frameCount % 1000)*v0)
}

//
//if (grow == true) {
//  vTime = abs(sin(frameCount % 1000)*v0)
//} else if (grow == null) {
//  vTime = v0/2;
//}

function drawArrow(base, vec, myColor) {
  push();
  
  stroke(myColor);
  strokeWeight(10);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  
  pop();
}