const canvas = document.querySelector("#draw");
const small = document.querySelector(".small");
const medium = document.querySelector(".medium");
const large = document.querySelector(".large");
const download = document.querySelector(".btn")
// const clear = document.querySelector(".clear")

const context = canvas.getContext("2d");

innerHeight = window.innerHeight / 1.3;
innerWidth = window.innerWidth;
canvas.width = innerWidth;
canvas.height = innerHeight;
context.strokeStyle = "#BADA55";
context.lineJoin = "round";
context.lineCap = "round";
// context.lineWidth = 50;
context.globalCompositeOperation = "multiply";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
// let direction = true;

let isSmall = false;
let isMedium = true;
let isLarge = false;

small.addEventListener("click", () => {
    isSmall = true;
    isMedium = false;
    isLarge = false;
    console.log(isSmall);
})
medium.addEventListener("click", () => {
    isMedium = true;
    isLarge = false;
    isSmall = false;
})
large.addEventListener("click", () => {
    isLarge = true;
    isMedium = false;
    isSmall = false;
})

function handleLineWidth() {
    if (isSmall) {
        context.lineWidth = 20;
        console.log("small");
    } else if (isMedium) {
        context.lineWidth = 40;
    } else {
        context.lineWidth = 80;
    }
}

function draw(e) {
    handleLineWidth();
    if (!isDrawing) return;//to stop the function from running if mouse isnt down
    context.strokeStyle = `hsl(${hue}, 80%, 50%)`;
    context.beginPath();
    //start from
    context.moveTo(lastX, lastY);
    //go to
    context.lineTo(e.offsetX, e.offsetY)
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY]
    hue++;
    if (hue >= 360) {
        hue = 0;
    }
    // if (context.lineWidth >= 100 || context.lineWidth <= 1) {
    //     direction = !direction;
    // }
    // if (direction) {
    //     context.lineWidth++;
    // }else{
    //     context.lineWidth--;
    // }
}
function downloadCanvas() {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "my_sketch.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]
});
canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);

download.addEventListener("click", downloadCanvas);