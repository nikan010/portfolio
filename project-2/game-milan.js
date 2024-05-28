const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10, paddleHeight = 100;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
const paddleSpeed = 10;

let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 2, ballSpeedY = 2;
const ballRadius = 10;
const startButton = document.getElementById("startButton");

let playerScore = 0, botScore = 0;
const winningScore = 3;
let playerName = '';

document.getElementById('startButton').addEventListener('click', function() {
    playerName = document.getElementById('playerName').value;
    if (playerName) {
        startPongGame();
        this.style.display = 'none'; 
    } else {
        alert('Voer een naam in.');
    }
});

function drawGame() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fill();
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
    ctx.fillText(playerScore, 100, 100);
    ctx.fillText(botScore, canvas.width - 100, 100);
}

function updateGame() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX * 1.10; 
        ballSpeedY *= 1.10;
    }

    if (ballX > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX * 1.10;
        ballSpeedY *= 1.10;
    }

    if (ballX < 0 || ballX > canvas.width) {
        if (ballX < 0) botScore++;
        else playerScore++;
        ballReset();
        if (playerScore === winningScore || botScore === winningScore) {
            endGame();
        }
    }

    botMove();
}

function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 2;
    ballSpeedY = 2;
}

function playerMove(up) {
    if (up) {
        leftPaddleY -= paddleSpeed;
        if (leftPaddleY < 0) leftPaddleY = 0;
    } else {
        leftPaddleY += paddleSpeed;
        if (leftPaddleY > canvas.height - paddleHeight) leftPaddleY = canvas.height - paddleHeight;
    }
}

function botMove() {
    let paddleCenter = rightPaddleY + (paddleHeight / 2);
    let botMovementSpeed = 0.06;
    if (paddleCenter < ballY - 35) {
        rightPaddleY += (ballY - paddleCenter) * botMovementSpeed;
    } else if (paddleCenter > ballY + 35) {
        rightPaddleY -= (paddleCenter - ballY) * botMovementSpeed;
    }


    if (rightPaddleY < 0) rightPaddleY = 0;
    else if (rightPaddleY > canvas.height - paddleHeight) rightPaddleY = canvas.height - paddleHeight;
}


function endGame() {
    let winner = playerScore === winningScore ? playerName : 'Bot';
    alert(`Game Over! ${winner} wint!`);
    playerScore = 0;
    botScore = 0;
    ballReset();
    document.getElementById('startButton').style.display = 'block'; 
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        playerMove(true);
    } else if (event.key === 'ArrowDown') {
        playerMove(false);
    }
});

function gameLoop() {
    updateGame();
    drawGame();
}

setInterval(gameLoop, 1000 / 60);


startButton.addEventListener("click", () => {
  canvas.style.display = null  
})