function setup() {
    cnv = createCanvas(1000 , 75);
    cnv.parent('sketch-holder-body');
  
    cnv.mouseOver(mOver);
    cnv.mouseOut(mOut);
  
    angleMode(DEGREES);
}
  
function draw() {
    background(255);
}