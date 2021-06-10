let maxHeight = window.innerHeight;
let maxWidth = window.innerWidth;
let canvas = makeCanvas("fracCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
let sideValue = document.getElementById("sides");
let ratio1Value = document.getElementById("ratio1");
let ratio2Value = document.getElementById("ratio2");
let sides;
let ratio1, ratio2;

const home = document.getElementById("frame");
home.appendChild(canvas);

const rnd = function(floor, ceiling) {
  //----------------------------------------------------//
  //Generates a random integer                          //
  //----------------------------------------------------//
  //floor(integer)-> lower bound of the number          //
  //ceiling(integer)-> upper bound of the number        //
  //----------------------------------------------------//
  //return(integer)-> "random" number                   //
  //----------------------------------------------------//

  let range = (ceiling - floor) + 1;
  return Math.floor((Math.random() * range) + floor);
}

function makeCanvas(id, height = 501, width = 501) {
  //----------------------------------------------------//
  //Makes a canvas element                              //
  //----------------------------------------------------//
  //id(string)-> id of the canvas element               //
  //height(integer)-> height of the canvas element      //
  //width(integer)-> width of the canvas element        //
  //----------------------------------------------------//
  //return(element)-> canvas element                    //
  //----------------------------------------------------//

  var canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.classList.add("canvas");
  canvas.height = height;
  canvas.width = width;

  return canvas;
}

function makeDot(point) {
  //----------------------------------------------------//
  //A quick, easy way to make a pixel in canvas         //
  //----------------------------------------------------//
  //point(array of integers)-> the point where the pixel//
  //  should be placed                                  //
  //----------------------------------------------------//

  ctx.fillRect(point[0], point[1], 1, 1);
}

function getPoint(point1, point2) {
  //----------------------------------------------------//
  //Calculates and returns a point a fractional distance//
  //  between two other points                          //
  //----------------------------------------------------//
  //point1(array of integers)-> coordinates of first    //
  //  point                                             //
  //point2(array of integers)-> coordinates of second   //
  //  point                                             //
  //----------------------------------------------------//
  //return(array of integers)-> coordinates of new point//
  //----------------------------------------------------//

  let x = ((ratio1 * point2[0]) + (ratio2 * point1[0])) / (ratio1 + ratio2);
  let y = ((ratio1 * point2[1]) + (ratio2 * point1[1])) / (ratio1 + ratio2);

  //let x = (point1[0] + point2[0]) / dist;
  //let y = (point1[1] + point2[1]) / dist;
  return [x, y];
}

function getPoints(interval) {
  //----------------------------------------------------//
  //Gets the initial points used for plotting the other //
  //  points                                            //
  //----------------------------------------------------//
  //interval(float)-> interval in radians the points    //
  //  should be placed along a circle                   //
  //----------------------------------------------------//
  //return(array of floats)-> cartesian point           //
  //----------------------------------------------------//

  let x = (Math.cos((interval - .5) * Math.PI) * 250) + 250;
  let y = (Math.sin((interval - .5) * Math.PI) * 250) + 250;
  return [x, y];
}

function draw() {
  //----------------------------------------------------//
  //Gets the data from the HTML to run the program and  //
  //  draw the fractal                                  //
  //----------------------------------------------------//

  ctx.clearRect(0, 0, 501, 501);

  sides = parseInt(sideValue.value);

  ratio1 = parseFloat(ratio1Value.value);
  ratio2 = parseFloat(ratio2Value.value);

  let interval = 2 / sides;

  let points = [];

  for (let i = 0; i < sides; i++) {
    points[i] = getPoints(i * interval);
    makeDot(points[i]);
  }

  let currentX = rnd(1, 500);
  let currentY = rnd(1, 500);
  let current = [currentX, currentY];
  console.log(current);

  for (let i = 0; i < 100000; i++) {
    let random = rnd(1, sides);
    let mid;

    mid = getPoint(points[random % sides], current);

    current = mid;
    makeDot(current);
  }
}
