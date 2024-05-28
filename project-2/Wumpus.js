document.addEventListener("DOMContentLoaded", function () {
    const duck = document.getElementById("duck");
    const scoreElement = document.getElementById("score");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const gameContainer = document.querySelector(".game-container");
    let score = 0;
    let countdownTimer;
    let gameRunning = false;

    startButton.addEventListener("click", startGame);
    stopButton.addEventListener("click", stopGame);

    duck.addEventListener("click", function () {
        if (gameRunning) {
            score++;
            updateScore();
            playSound("sfx/duck hit.mp3"); // Geluidseffect voor als de eend gehit word
            resetDuckPosition();
        }
    });

    function updateScore() {
        scoreElement.textContent = score;
    }

    function resetDuckPosition() {
        const maxX = gameContainer.clientWidth - duck.clientWidth;
        const maxY = gameContainer.clientHeight - duck.clientHeight;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        duck.style.left = `${randomX}px`;
        duck.style.top = `${randomY}px`;

        if (gameRunning) {
            duck.style.display = 'block'; // Eend
        }
    }

    function handleResize() {
        resetDuckPosition();
    }

    window.addEventListener("resize", handleResize);

    function startGame() {
        if (!gameRunning) {
            startButton.disabled = true;
            stopButton.disabled = false;
            playSound("sfx/start.mp3"); // Geluidseffect voor start
            countdown(7000); // Cooldown van 7 sec, game start na deze cooldown (kan je aanpassen)
        }
    }

    function stopGame() {
        startButton.disabled = false;
        stopButton.disabled = true;
        clearInterval(countdownTimer);
        gameRunning = false;
        showGameOver(score); // Zegt game over wanneer de game klaar is met de score er achter
        score = 0; // Reset score
        updateScore();
    }

    function playSound(soundFile) {
        const audio = new Audio(soundFile);
        audio.play();
    }

    function countdown(milliseconds) {
        setTimeout(function () {
            startCountdown();
        }, milliseconds);
    }

    function startCountdown() {
        gameRunning = true;
        resetDuckPosition();
        updateScore();
        countdownTimer = setTimeout(function () {
            stopGame(); // Stopt spel na de tijd over is (kan je zelf aanpassen)
        }, 15000); // <-- Pas het hier aan
    }

    function showGameOver(finalScore) {
        alert(`Game over! Je eindscore: ${finalScore}`);
        playSound("Loud Horn.mp3")
    }
});
