let maxHeight = window.innerHeight;
let maxWidth = window.innerWidth;
let canvas = makeCanvas("fracCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
let sides;
let dist;

const home = document.getElementById("frame");
home.appendChild(canvas);

const rnd = function(floor, ceiling) {
  //----------------------------------------------------//
  //Gets random number for the math problems            //
  //where floor is the lowest number possible and       //
  //ceiling is the highest number possible              //
  //----------------------------------------------------//

  let range = (ceiling - floor) + 1;
  return Math.floor((Math.random() * range) + floor);
}

function makeCanvas(id, height = 501, width = 501) {
  //----------------------------------------------------//
  //Returns a canvas                                    //
  //string-> id: the id of the canvas                   //
  //integer-> height: height of the canvas              //
  //integer-> width: width of the makeCanvas            //
  //----------------------------------------------------//

  var canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.classList.add("canvas");
  canvas.height = height;
  canvas.width = width;

  return canvas;
}

function makeDot(point) {
  ctx.fillRect(point[0], point[1], 1, 1);
}

function getMidpoint(point1, point2) {
  let x = (point1[0] + point2[0]) / dist;
  let y = (point1[1] + point2[1]) / dist;
  return [x, y];
}

function getPoints(interval) {
  let x = (Math.cos((interval - .5) * Math.PI) * 250) + 250;
  let y = (Math.sin((interval - .5) * Math.PI) * 250) + 250;
  return [x, y];
}

function draw() {
  ctx.clearRect(0, 0, 501, 501);

  sides = parseInt(document.getElementById("sides").value);

  dist = parseInt(document.getElementById("dist").value);

  let interval = 2 / sides;

  let points = [];

  for (let i = 0; i < sides; i++) {
    points[i] = getPoints(i * interval);
    makeDot(points[i]);
  }

  let currentX = rnd(1, 500);
  let currentY = rnd(1, 500);
  let current = [currentX, currentY];

  for (let i = 0; i < 10000; i++) {
    let random = rnd(1, sides);
    let mid;

    mid = getMidpoint(points[random % sides], current);

    current = mid;
    makeDot(current);
  }
}
