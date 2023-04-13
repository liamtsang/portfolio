// Set Canvas height and width
  
  let c = {
	"height": window.innerHeight,
	"width": window.innerWidth,
  }

  // Setup Function for pixel clarity, canvas creation, and DOM insertion
  function setup() {
	pixelDensity(2.0);
	let canvas = createCanvas(c.width, c.height);
	canvas.style('z-index', '-1');
	canvas.style('overflow', 'hidden');
	canvas.parent('sketch-holder');
  }
  
  function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	c = {
		"height": window.innerHeight,
		"width": window.innerWidth,
	}
	console.log("Resized");
  }

 
  
  // Draws the background and calls the function for drawing the dots
  function draw() {
	clear();
	background(255, 255, 255);
	
	noStroke();
	drawDots();
	let mouseoverImg = select('img');

	
	console.log(mouseoverImg);
  }


  // i and j function as x and y when drawing the dot grid.  
  function drawDots() {
	
	for(j=20; j<=c.width; j+=20) {
		for(i=20; i<=c.height; i+=20) {
		  let x = mouseX;
		  let y = mouseY;

		  let dist = pythag(j, i);
		  let size = 4 + (20 * (20 / dist));

		  fill(0, 0 , 0,  dist);

		  if (size > 10) size = 10;
		  ellipse(j, i, size, size);
		}
	  }
  }
  
  // Grabs mouse position, checks if the mouse is off the screen (NaN) and calculates the distance from the mouse pointer and each dot using the pythagorean theorem.
  function pythag(ellipseX, ellipseY) {
	let x = mouseX;
	let y = mouseY;
	
	if (x==NaN) {
	  return 1;
	} else {
		let leg1 = Math.abs(x - ellipseX);
		let leg2 = Math.abs(y - ellipseY);
		let pyth = Math.pow(leg1, 2) + Math.pow(leg2, 2);
		return Math.sqrt(pyth);
	}
  }