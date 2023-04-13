
let grow;
	let vTime = 1;
	let v0;
	
	function setup() {
	  cnv = createCanvas(75 , 75);
	  cnv.parent('sketch-holder-header');
	
	  cnv.mouseOver(mOver);
	  cnv.mouseOut(mOut);
	
	  grow = null;
	  angleMode(DEGREES);
	  console.log("test");
	}
	
	function draw() {
	  background(255);
	
	  v0 = 15;
	
	  if (grow == true) {
		vTime = vTime+0.08;
	  } else if (grow == null) {
		vTime = 1;
	  } else if (grow == false) {
		vTime = 1;
	  }
	  //let v1 = map(vTime, 0, v0, 0, v0-5, true)
	  let v1 = v0
	  
	  push();
	  drawArrow((frameCount % 1000 * vTime), v0, 'blue');
	  drawArrow((frameCount % 1000 * vTime)+40, v0, 'blue');
	  drawArrow((frameCount % 1000 * vTime)+80, v0, 'blue');
	  drawArrow((frameCount % 1000 * vTime)+120, v0, 'blue');
	  drawArrow((frameCount % 1000 * vTime)+160, v0, 'blue');
	  drawArrow((frameCount % 1000 * vTime)+200, v0, 'blue');
	  drawArrow((frameCount % 1000 * vTime)+240, v0, 'blue');
	  drawArrow((frameCount % 1000 * vTime)+280, v0, 'blue');
	  drawArrow((frameCount % 1000 * vTime)+320, v0, 'blue');
	  pop();
	  
	  noFill();
	  stroke('blue')
	  strokeWeight(3);
	  ellipse(width/2, height/2, v0*1.5, v0*1.5)
	}
	
	function mOver(){
	  grow = true;
	}
	
	function mOut(){
	  grow = false;
	  vTime = 1;
	}
	
	function drawArrow(angle, r, myColor) {
	  push();
	  stroke(myColor);
	  strokeWeight(3);
	  fill(myColor);
	  translate(width/2, height/2);
	  let sVec = createVector(r * sin(angle), r * cos(angle))
	  let eVec = createVector(2 * r * sin(angle), 2 * r * cos(angle))
	  line(sVec.x, sVec.y, eVec.x, eVec.y);
	  
	  rotate(eVec.heading());
	  let arrowSize = 3;
	  translate(eVec.mag() - arrowSize, 0);
	  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
	  pop();
	}