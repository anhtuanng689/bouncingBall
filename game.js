let canvas;
let ctx;
let ball;
let bar;
let gameScore;
let img = new Image();
img.src = 'menuGame.png';

window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
}

function init() {
    document.getElementById("bt1").style.display = 'none';
    document.getElementById("bt2").style.display = 'none';
    document.getElementById("bt3").style.display = 'none';

    ball = new Ball(canvas.width/2, canvas.height/2, 15, 1, 3);
    bar = new Bar(240, 550, 10); //550
    gameScore = new Score(0);

    window.addEventListener('keydown', (event) => {
        bar.handleEvent(event);
    }, false);

    setInterval(draw, 10);
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall(ctx);
    bar.drawBar(ctx);
    gameScore.drawScore(ctx);
    ball.collision(bar, gameScore);
}

function media() {

}

let Ball = function (x, y, r, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.drawBall = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.closePath();
    }
    this.collision = function (Bar, Score) {
        if (this.x + this.dx + 5 > canvas.width || this.x + this.dx - 5 < 0){
            this.dx = -this.dx;
            Score.score += 100;
        }
        if (this.y + this.dy + 5 >= Bar.y - 10 && this.x + this.dx + 5 > Bar.x && this.x + this.dx - 5 < Bar.x + 150) { // this.y + this.dy > Bar.y && this.x > Bar.x && this.x < Bar.x + Bar.width
            this.dy = -this.dy;
            Score.score += 100;
        }
        if (this.y + this.dy - 5 < 0) { //this.y + this.dy > canvas.height || this.y + this.dy < 0
            this.dy = -this.dy;
            Score.score += 100;
        }
        if (this.y + this.dy + 5 == canvas.height - 10) {
            window.close();
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}

let Bar = function (x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.drawBar = function (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 150, this.y);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = 'blue';
        ctx.stroke();
        ctx.closePath();
    }
    this.handleEvent = function (evt) {
        switch (evt.keyCode) {
            case 37:
                if (this.x - 10 >= 0){
                    this.x -= 10;
                }
                break;
            case 39:
                if (this.x + 150 + 10 <= canvas.width){
                    this.x += 10;
                }
                break;
        }
    }
}

let Score = function (score) {
    this.score = score;
    this.drawScore = function (ctx) {
        ctx.font = "25px Arial";
        ctx.fillText("Score: ", 5, 30);
        ctx.fillText(this.score, 80, 30);
        ctx.stroke();
        console.log("Ok");
    }
}