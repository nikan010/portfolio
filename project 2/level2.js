// Elementen ophalen uit de DOM
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");

// Constanten voor het spel
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;

// Variabelen voor het spel en initailspeed is 100 
let running = false;
let initialSpeed = 100;
let speed = initialSpeed;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

// Event listeners toevoegen
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

// Het spel starten
gameStart();

// Functie om het spel te starten
function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
}

// Functie voor de game loop
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, speed);
    } else {
        displayGameOver();
    }
}

// Functie om het speelveld te wissen
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

// Functie om voedsel te creëren
function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameHeight - unitSize);
}

// Functie om voedsel te tekenen
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

// Functie om de slang te laten bewegen
function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };

    snake.unshift(head);
    // Als voedsel wordt gegeten
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
        // Snelheid met 5 verminderd elke keer dat voedsel wordt gegeten
        speed -= 5;
    } else {
        snake.pop();
    }
}

// Functie om de slang te tekenen
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}

// Functie om de richting te veranderen op basis van toetsenbordinvoer
// Functie om de richting te veranderen op basis van toetsenbordinvoer
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const KeyW = 87;
    const KeyA = 65;
    const KeyS = 83;
    const KeyD = 68;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
        case(keyPressed == KeyW && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == KeyA && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == KeyS && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
        case(keyPressed == KeyD && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
    }
};


// Functie om te controleren of het spel is afgelopen
function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            running = false;
        }
    }
}

// Functie om het game over scherm weer te geven
function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
}

// Functie om het spel te resetten
function resetGame(){
    logAntwoord(score); // Add this line
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};
function logAntwoord(score) {
    var loglijst = document.getElementById("loglijst");
    var listItem = document.createElement("li");
    listItem.textContent = score; // Update this line
    loglijst.appendChild(listItem);
}


function resetlog() {
var loglijst = document.getElementById("loglijst");
loglijst.innerHTML = "";
}