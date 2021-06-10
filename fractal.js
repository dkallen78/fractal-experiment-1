//let maxHeight = window.innerHeight;
//let maxWidth = window.innerWidth;
let canvas = makeCanvas("fracCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";

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

function getMidpoint(point1, point2) {
  //----------------------------------------------------//
  //Calculates the midpoint of a line segment           //
  //----------------------------------------------------//
  //point1(array of integers)-> coordinates of first    //
  //  point                                             //
  //point2(array of integers)-> coordinates of second   //
  //  point                                             //
  //----------------------------------------------------//
  //return(array of integers)-> coordinates of midpoint //
  //----------------------------------------------------//

  let x = (point1[0] + point2[0]) / 2;
  let y = (point1[1] + point2[1]) / 2;
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

function setInitialValues() {
  //----------------------------------------------------//
  //Sets the initial values of the program input to     //
  //  their defaults                                    //
  //----------------------------------------------------//

  sideValue = document.getElementById("sides");
  sideValue.value = 3;
  sideValue.oninput = draw;
  ratio1Value = document.getElementById("ratio1");
  ratio1Value.value = 1;
  ratio1Value.oninput = draw;
  ratio2Value = document.getElementById("ratio2");
  ratio2Value.value = 1;
  ratio2Value.oninput = draw;
  dotsValue = document.getElementById("dots");
  dotsValue.value = 5;
  dotsValue.oninput = draw;
  centerValue = document.getElementById("center");
  centerValue.checked = false;
  centerValue.oninput = draw;
  rule1Value = document.getElementById("rule1");
  rule1Value.checked = false;
  rule1Value.oninput = draw;
  rule2Value = document.getElementById("rule2");
  rule2Value.checked = false;
  rule2Value.oninput = draw;
  rule3Value = document.getElementById("rule3");
  rule3Value.checked = false;
  rule3Value.oninput = draw;
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
  dots = 10 ** parseFloat(dotsValue.value);

  //
  //The interval in radians to place the initial points
  let interval = 2 / sides;

  //
  //Generates the inital points/vertices based on the
  //  number of sides
  let points = [];
  for (let i = 0; i < sides; i++) {
    points[i] = getPoints(i * interval);
    makeDot(points[i]);
  }

  //
  //Adds the midpoints of the sides to the vertices
  if (rule2Value.checked) {
    let points2 = [];
    for (let i = 0; i < points.length; i++) {
      points2[i] = getMidpoint(points[i], points[(i + 1) % points.length]);
      makeDot(points2[i]);
    }
    points = points.concat(points2);
    sides *= 2;
  }

  //
  //Adds the center point to the vertices
  if (centerValue.checked) {
    points.push([250, 250]);
    makeDot(points[points.length - 1]);
    sides++;
  }

  //
  //Randomly generates the first point
  let current = [rnd(1, 500), rnd(1, 500)];

  //
  //Draws the dots
  for (let i = 0; i < dots; i++) {
    vertex = rnd(1, sides);

    //
    //Prevents the same vertex from being moved to
    //  twice in a row
    /*if (rule1Value.checked) {
      while (vertex === oldVertex) {
        vertex = rnd(1, sides);
      }
    } else {
      vertex = rnd(1, sides);
    }*/

    if (rule3Value.checked) {
      if (rule1Value.checked) {

      }
      while ((vertex + 1) % sides === (oldVertex % sides)) {
        vertex = rnd(1, sides);
      }
    }

    oldVertex = vertex;
    newPoint = getPoint(points[vertex % sides], current);
    current = newPoint;
    makeDot(current);
  }
}

setInitialValues();

draw();
