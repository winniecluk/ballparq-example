var canvas = document.querySelector('canvas');

var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// modify below -- is loop animation desired?
function animate() {
  update();
  draw();
}

function update(){

}

function draw(){

}

animate();

// Vector constructor and methods
function Vector(x, y){
  this.x = x || 0;
  this.y = y || 0;
}

// add two vectors
Vector.prototype.add = function(newVector) {
  this.x += newVector.x;
  this.y += newVector.y;
}

// get length -- check this
Vector.prototype.getMagnitude = function(){
  return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

// get angle
Vector.prototype.getAngle = function(){
  return Math.atan2(this.y, this.x);
}
