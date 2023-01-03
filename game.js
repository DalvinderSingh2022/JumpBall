const canvas = document.querySelector("canvas");
const container = document.querySelector(".container");
var ctx = canvas.getContext("2d");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

canvas.style.backgroundImage = `url('${themeData[selected.Theme].image}')`;
const ballImage = `${ballData[selected.Ball]}`;
const wallImage = `${themeData[selected.Theme].wall.image}`;
const wallWidth = `${themeData[selected.Theme].wall.width}`;
const audio = new Audio("Images/move.mp3");

var upTimer;
var deltaTime;
var downTimer;
var level = 1;
var frameNo = 1;
var lastTime = 0;
var Hiscore = localStorage.getItem("BallJumpHiScore") || 0;
var wallsArr = [];
var isJumping = false;
var IsGameOver = false;

class Ball {
    constructor() {
        this.size = 40;
        this.position = { x: 0, y: canvasHeight - this.size }
        this.speed = { x: 0, y: 0 };
        this.image = new Image();
        this.image.src = ballImage;
    }
    reset() {
        this.position = { x: 0, y: canvasHeight - this.size };
        this.speed = { x: 0, y: 0 };
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
    update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.position.x < 20) this.position.x = 20;
        if (this.position.y < 0) this.position.y = 0;
        if (this.position.x + this.size >= canvasWidth) this.position.x = canvasWidth - this.size;
        if (this.position.y + this.size >= canvasHeight) this.position.y = canvasHeight - this.size;
    }
    jump() {
        if (!isJumping) {
            clearInterval(downTimer);
            isJumping = true;
            upTimer = setInterval(() => {
                this.speed.y -= .75;
                this.speed.x += .15;
                if (ball.position.y < canvasHeight - 200) {
                    this.fall();
                }
            }, 30);
        }
    }
    fall() {
        if (isJumping) {
            isJumping = false;
            clearInterval(upTimer);
            downTimer = setInterval(() => {
                this.speed.y += 3;
                this.speed.x += .5;
                if (ball.position.y + ball.size >= canvasHeight) {
                    this.speed.y = 0;
                    this.speed.x = -1.25;
                }
            }, 30)
        }
    }
}

class Walls {
    constructor(randomHeight) {
        this.height = randomHeight;
        this.width = wallWidth;
        this.position = { x: canvasWidth, y: canvasHeight - this.height };
        this.speed = { x: 0, y: 0 };
        this.image = new Image();
        this.image.src = wallImage;
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.position.x += this.speed.x;
        if (this.position.x + this.width <= 0) {
            wallsArr.shift();
        }
    }
}

class Score {
    constructor() {
        this.height = canvasHeight;
        this.width = canvasWidth;
        this.position = { x: 0, y: 0 };
    }
    draw(score) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(0, 10, 160, 45);
        ctx.fillRect(canvasWidth - 160, 10, 160, 45);

        ctx.font = "24px 'Oswald', sans-serif";
        ctx.fillStyle = "#FF8F00";
        ctx.textAlign = "center";
        ctx.fillText("Score : " + score, 80, 40);
        ctx.fillText("HiScore : " + localStorage.getItem("BallJumpHiScore"), canvasWidth - 80, 40);
    }
}

function createWalls() {
    if (frameNo == 1 || (level * frameNo % 150 == 0)) {
        randomHeight = Math.floor(Math.random() * 50 + 100);
        wallsArr.push(new Walls(randomHeight));
    }
    for (i = 0; i < wallsArr.length; i += 1) {
        wallsArr[i].speed.x -= .025;
        wallsArr[i].draw();
        wallsArr[i].update();
    }
}

function gameOver() {
    isJumping = false;
    IsGameOver = true;
    clearInterval(upTimer);
    clearInterval(downTimer);
    const restart = container.querySelector(".pri");
    const scoreEl = container.querySelector(".score");
    const hiscoreEl = container.querySelector(".hiscore");

    restart.onclick = () => Restart();
    canvas.classList.add("hide");
    scoreEl.innerText = `YOUR SCORE : ${parseInt(frameNo / 25)}`
    hiscoreEl.innerText = `HIGH SCORE : ${Hiscore}`
    container.classList.remove("hide");
    if (Hiscore <= parseInt(frameNo / 25)) hiscoreEl.innerText = "NEW HIGH SCORE";
}

function Restart() {
    wallsArr = [];
    ball.reset();
    canvas.classList.remove("hide");
    container.classList.add("hide");
    IsGameOver = false;
    frameNo = 1;
    requestAnimationFrame(gameEngine);
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 32) {
        ball.jump();
        audio.play();
    }
});

const ball = new Ball();
const score = new Score();

function gameEngine(timestamp) {
    if (!IsGameOver) {
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        frameNo++;
        if (frameNo % 4500 == 0) level++;
        if (parseInt(frameNo / 25) > Hiscore) localStorage.setItem("BallJumpHiScore", parseInt(frameNo / 25))

        createWalls();

        ball.update();
        ball.draw();

        score.draw(parseInt(frameNo / 25));

        wallsArr.forEach(wall => {
            if ((ball.position.y + ball.size >= wall.position.y) &&
                (ball.position.y <= wall.position.y + wall.height) &&
                (ball.position.x + ball.size >= wall.position.x) &&
                (ball.position.x <= wall.position.x + wall.width)) {
                gameOver();
            }
        })
        requestAnimationFrame(gameEngine);
    }
}
requestAnimationFrame(gameEngine);