const canvas = document.querySelector("#draw");
// Create 2d canvas
const context = canvas.getContext("2d");

const colourPicker = document.getElementById("colourPickerContainer");
const backgroundColour = document.getElementById("backgroundColourContainer");
const increaseWidth = document.getElementById("increaseWidth");
const decreaseWidth = document.getElementById("decreaseWidth");
const squareLine = document.getElementById("squareLine");
const roundLine = document.getElementById("roundLine");
const download = document.getElementById("download");

const colours = [
  "#FF0000",
  "yellow",
  "blue",
  "black",
  "orange",
  "green",
  "gray",
  "turquoise",
  "indigo",
  "purple",
  "brown",
  "white",
  "pink",
];

// context.lineJoin = "round";
// context.lineCap = "round";

// Where you draw on the page
let lastX = 0;
let lastY = 0;

// Set drawing to start
let drawing = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context.lineJoin = "round";
// context.lineCap = "round";
context.lineWidth = 10;

function displayColours() {
  colours.map((colour) => {
    const button = document.createElement("button");
    button.style.backgroundColor = colour;
    button.className = "colour-buttons";
    colourPicker.appendChild(button);
    button.addEventListener("click", () => {
      context.strokeStyle = colour;
    });
  });
}

function backgroundColours() {
  colours.map((colour) => {
    const button = document.createElement("button");
    button.style.background = colour;
    button.className = "colour-buttons";
    backgroundColour.appendChild(button);
    button.addEventListener("click", () => {
      context.fillStyle = colour;
      context.fillRect(0, 0, canvas.width, canvas.height);
    });
  });
}

displayColours();
backgroundColours();

function widenWidth() {
  context.lineWidth = context.lineWidth + 5;
}

function narrowWidth() {
  context.lineWidth = context.lineWidth - 5;
}

function draw(e) {
  if (!drawing)
    // If drawing equals false it returns
    return;

  // Start a new path
  context.beginPath();

  // Creates the coordinates of the new path
  context.moveTo(lastX, lastY);

  // Connects the path from last coordinates to current ones
  context.lineTo(e.offsetX, e.offsetY);

  // Creates the drawing
  context.stroke();

  // Constantly changes the coordinates so it draws a line when the mouse moves
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

async function downloadCanvas(e) {
  const anchor = document.getElementById("download");
  anchor.href = canvas.toDataURL("image/png");
  anchor.download = "IMAGE.PNG";
}

// Fired when mouse is pressed and before it is released
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("mouseup", () => (drawing = false));

// When the mouse is not on the page
canvas.addEventListener("mouseout", () => (drawing = false));

increaseWidth.addEventListener("click", widenWidth);

decreaseWidth.addEventListener("click", narrowWidth);

const changeLine = (e) => {
  if (e.target.id === "squareLine") {
    context.lineCap = "square";
  } else if (e.target.id === "roundLine") {
    context.lineCap = "round";
  }
};

squareLine.addEventListener("click", changeLine);
roundLine.addEventListener("click", changeLine);

download.addEventListener("click", downloadCanvas);

document.addEventListener("DOMContentLoaded", () => {
  context.lineJoin = "round";
  context.lineCap = "round";
});
