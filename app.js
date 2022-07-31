const canvas = document.querySelector("#draw");
// Where you draw on the page
let lastX = 0;
let lastY = 0;
let drawing = false;
// Create 2d canvas
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.strokeStyle = "#000000";
context.lineJoin = "round";
context.lineCap = "round";

function draw(e) {
  if (!drawing) return;
  console.log(e);
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", () => (drawing = true));
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mouseout", () => (drawing = false));
