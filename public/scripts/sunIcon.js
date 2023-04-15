//Sun
let sunSketch = function(s) {
	let grow;
	let vTime = 1;
	let v0;

	s.setup = function() {
		cnv = s.createCanvas(65 , 65);
		cnv.parent('sketch-holder-header');
	
		cnv.mouseOver(s.mOver);
		cnv.mouseOut(s.mOut);
	
		grow = null;
		s.angleMode(s.DEGREES);
		console.log("test");
	};
		
	s.draw = function() {
	  s.background(255);
	
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
	  
	  s.push();
	  s.drawArrow((s.frameCount % 1000 * vTime), v0, 'blue');
	  s.drawArrow((s.frameCount % 1000 * vTime)+40, v0, 'blue');
	  s.drawArrow((s.frameCount % 1000 * vTime)+80, v0, 'blue');
	  s.drawArrow((s.frameCount % 1000 * vTime)+120, v0, 'blue');
	  s.drawArrow((s.frameCount % 1000 * vTime)+160, v0, 'blue');
	  s.drawArrow((s.frameCount % 1000 * vTime)+200, v0, 'blue');
	  s.drawArrow((s.frameCount % 1000 * vTime)+240, v0, 'blue');
	  s.drawArrow((s.frameCount % 1000 * vTime)+280, v0, 'blue');
	  s.drawArrow((s.frameCount % 1000 * vTime)+320, v0, 'blue');
	  s.pop();
	  
	  s.noFill();
	  s.stroke('blue')
	  s.strokeWeight(3);
	  s.ellipse(s.width/2, s.height/2, v0*1.5, v0*1.5)
	}
	
	s.mOver = function() {
	  grow = true;
	}
	
	s.mOut = function() {
	  grow = false;
	  vTime = 1;
	}
	
	s.drawArrow = function(angle, r, myColor) {
	  s.push();
	  s.stroke(myColor);
	  s.strokeWeight(3);
	  s.fill(myColor);
	  s.translate(s.width/2, s.height/2);
	  let sVec = s.createVector(r * s.sin(angle), r * s.cos(angle))
	  let eVec = s.createVector(2 * r * s.sin(angle), 2 * r * s.cos(angle))
	  s.line(sVec.x, sVec.y, eVec.x, eVec.y);
	  
	  s.rotate(eVec.heading());
	  let arrowSize = 3;
	  s.translate(eVec.mag() - arrowSize, 0);
	  s.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
	  s.pop();
	}
}

let gameOfLifeSketch = function(s) {
	
	let w;
	let columns;
	let rows;
	let board;
	let next;

	s.setup = function() {
		// Set simulation framerate to 10 to avoid flickering
		s.frameRate(10);
		cnv = s.createCanvas(s.windowWidth/2, 400);
		cnv.parent('sketch-holder-body');
		w = 20;
		// Calculate columns and rows
		columns = s.floor(s.width / w);
		rows = s.floor(s.height / w);
		// Wacky way to make a 2D array is JS
		board = new Array(columns);
		for (let i = 0; i < columns; i++) {
			board[i] = new Array(rows);
		}
		// Going to use multiple 2D arrays and swap them
		next = new Array(columns);
		for (i = 0; i < columns; i++) {
			next[i] = new Array(rows);
		}
		s.init();
	}

	s.draw = function() {
		s.background(255);
		s.generate();
		for ( let i = 0; i < columns;i++) {
			for ( let j = 0; j < rows;j++) {
			if ((board[i][j] == 1)) s.fill(0);
			else s.fill(255);
			s.stroke(0);
				s.circle(i * w, j * w, w-1, w-1);
			}
		}
	}

	// reset board when mouse is pressed
	s.mousePressed = function() {
		s.init();
	}

	// Fill board randomly
	s.init = function() {
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
			// Lining the edges with 0s
			if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
			// Filling the rest randomly
			else board[i][j] = s.floor(s.random(2));
				next[i][j] = 0;
			}
		}
	}

	// The process of creating the new generation
	s.generate = function() {

	// Loop through every spot in our 2D array and check spots neighbors
	for (let x = 1; x < columns - 1; x++) {
		for (let y = 1; y < rows - 1; y++) {
		// Add up all the states in a 3x3 surrounding grid
		let neighbors = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
			neighbors += board[x+i][y+j];
			}
		}

		// A little trick to subtract the current cell's state since
		// we added it in the above loop
		neighbors -= board[x][y];
		// Rules of Life
		if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
		else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
		else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
		else                                             next[x][y] = board[x][y]; // Stasis
		}
	}

	let temp = board;
	board = next;
	next = temp;
	}
}

let c = {
	"height": window.innerHeight/1.5,
	"width": window.innerWidth/1.5,
}

let dotGridSketch = function(s) {

	s.setup = function() {
		s.pixelDensity(2.0);
		let canvas = s.createCanvas(c.width, c.height);
		canvas.parent('sketch-holder-body')
	}
	  
	 // Draws the background and calls the function for drawing the dots
	s.draw = function() {
		s.clear();
		s.background(255, 255, 255);
		
		s.stroke('black');
		s.drawDots();
	}
	
	
	  // i and j function as x and y when drawing the dot grid.  
	s.drawDots = function() {
		for(j=20; j<=c.width; j+=20) {
			for(i=20; i<=c.height; i+=20) {
			  	let x = s.mouseX;
			  	let y = s.mouseY;
				
				let dist = s.pythag(j, i);
				let size = 4 + (20 * (20 / dist));
				
				s.noFill();
				
				if (size > 20) {
					size = 20;
				}
				s.fill(255-size*5);

				s.ellipse(j, i, size, size);
		  }	
	  }
	}
	  
	  // Grabs mouse position, checks if the mouse is off the screen (NaN) and calculates the distance from the mouse pointer and each dot using the pythagorean theorem.
	  s.pythag = function(ellipseX, ellipseY) {
		let x = s.mouseX;
		let y = s.mouseY;
		
		if (x==NaN) {
		  return 1;
		} else {
			let leg1 = Math.abs(x - ellipseX);
			let leg2 = Math.abs(y - ellipseY);
			let pyth = Math.pow(leg1, 2) + Math.pow(leg2, 2);
			return Math.sqrt(pyth);
		}
	  }
}

let rainbowSketch = function(s) {
	s.setup = function() {
		s.pixelDensity(2.0);
		let canvas = s.createCanvas(c.width, c.height);
		s.colorMode(s.HSB);
		s.noStroke();
		canvas.parent('sketch-holder-body')
	}
	  
	s.draw = function() {
		s.background(100,0,100);
		
		s.drawObj(s.mouseX, s.mouseY);
	}

	s.drawObj = function(x, y) {
		size = 20;
		for ( let i = 0; i < 40; i++) {
			let n = s.sin(i/(s.frameCount%20 + 5))*3;
			s.fill((240-i*6),100,100);
			//s.rect(x+5*i,n+y,size,size);
			s.polygon(x+2*i,y+n,size,3)
		}
	}
	
	s.polygon = function(x, y, radius, npoints) {
		let angle = s.TWO_PI / npoints;
		s.beginShape();
		for (let a = 0; a < s.TWO_PI; a += angle) {
		  let sx = x + s.cos(a) * radius;
		  let sy = y + s.sin(a) * radius;
		  s.vertex(sx, sy);
		}
		s.endShape(s.CLOSE);
	  }
}

let caSketch = function(s) {
	var ca;

	s.setup = function() {
		cnv = s.createCanvas(640, 320);
		cnv.parent('sketch-holder-body')
		ca = new CA();
		cnv.mouseClicked(s.clicked);
	}

	s.draw = function() {
		ca.display();
		if (ca.generation < s.height/ca.w) {
			ca.generate();
		}  	    
	}

	s.clicked = function() {
		s.clear();
		ca.changeRule();
	}

	function CA() {
	
	this.w = 5;
	// An array of 0s and 1s
	this.cells = new Array(s.width/this.w);
	for (var i = 0; i < this.cells.length; i++) {
		this.cells[i] = 0;
	}

	this.cells[this.cells.length/2] = 1;
	this.generation = 0;

	this.ruleset = [0, 0, 1, 1, 1, 0, 0, 1];
	this.ruleArr = 0;

	this.changeRule = function () {
		console.log('cr')

		if (this.ruleArr  == 0) this.ruleset = [0, 1, 0, 1, 1, 0, 1, 0];
		if (this.ruleArr  == 1) this.ruleset = [0, 0, 0, 1, 1, 1, 1, 0];
		if (this.ruleArr  == 2) this.ruleset = [0, 1, 1, 0, 0, 1, 1, 0];
		if (this.ruleArr  == 3) this.ruleset = [1, 1, 0, 1, 1, 1, 1, 0];
		if (this.ruleArr  == 4) this.ruleset = [1, 0, 1, 1, 0, 1, 1, 0];
		if (this.ruleArr  == 5) this.ruleset = [0, 0, 1, 1, 1, 0, 0, 1];

		this.generation = 0;

		for (var i = 0; i < this.cells.length; i++) {
			this.cells[i] = 0;
		}
		this.cells[this.cells.length/2] = 1;

		this.ruleArr ++
		if (this.ruleArr > 5) this.ruleArr  = 0;
	}

	this.generate = function() {

		var nextgen = [];
		for (var i = 0; i < this.cells.length; i++) {
			nextgen[i] = 0;
		}

		for (var i = 1; i < this.cells.length-1; i++) {
			var left   = this.cells[i-1];
			if (i==1) left = 1;
			var me     = this.cells[i];     
			var right  = this.cells[i+1];
			nextgen[i] = this.rules(left, me, right);
		}
		this.cells = nextgen;
		this.generation++;
	};

	this.display = function() {
		for (var i = 0; i < this.cells.length; i++) {
			if (this.cells[i] == 1) {
				s.fill('black');
				s.noStroke();
				s.rect(i*this.w, this.generation*this.w, this.w, this.w);
			}        
			else {
				s.fill('white');
				s.noStroke();
				s.rect(i*this.w, this.generation*this.w, this.w, this.w);
			}
		}
	};

	this.rules = function(a, b, c) {
		if (a == 1 && b == 1 && c == 1) return this.ruleset[0];
		if (a == 1 && b == 1 && c === 0) return this.ruleset[1];
		if (a == 1 && b === 0 && c == 1) return this.ruleset[2];
		if (a == 1 && b === 0 && c === 0) return this.ruleset[3];
		if (a === 0 && b == 1 && c == 1) return this.ruleset[4];
		if (a === 0 && b == 1 && c === 0) return this.ruleset[5];
		if (a === 0 && b === 0 && c == 1) return this.ruleset[6];
		if (a === 0 && b === 0 && c === 0) return this.ruleset[7];
		return 0;
	};
	}
}

let main = new p5(caSketch);
let sun = new p5(sunSketch);