const canvas = document.querySelector("#draw");

// Create 2d canvas
const context = canvas.getContext("2d");
const colourPicker = document.getElementById("colourPickerContainer");
const colours = [
  "red",
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

// Where you draw on the page
let lastX = 0;
let lastY = 0;
let drawing = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.strokeStyle = "#000000";
context.lineJoin = "round";
context.lineCap = "round";
context.lineWidth = 10;

function displayColours() {
  colours.map((colour) => {
    const button = document.createElement("button");
    button.style.backgroundColor = colour;
    button.className = "colour-buttons";
    colourPicker.appendChild(button);
  });
}

displayColours();

function draw(e) {
  // If drawing equals false it returns
  if (!drawing) return;

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

// Fired when mouse is pressed and before it is released
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("mouseup", () => (drawing = false));

// When the mouse is not on the page
canvas.addEventListener("mouseout", () => (drawing = false));
