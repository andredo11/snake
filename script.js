var cx, cy, grow, snakePos, dir, canvas;
var decPos = [];
var sqSize = 50;
var sqPerc = 0.92;
var cHeight = 15,
    cWidth = 20;
var gameOver = false;
var foodx, foody;

function addFood() {
    while (true) {
        foodx = Math.floor(Math.random() * cWidth);
        foody = Math.floor(Math.random() * cHeight);
        var ok = true;
        for (i = 0; i < snakePos.length; i++)
            if (foodx == snakePos[i].x && foody == snakePos[i].y) {
                ok = false;
                break;
            }
        if (ok) break;
    }

}


function startGame() {
    gameOver = false;
    grow = 4;
    cx = 10;
    cy = 9;
    snakePos = [];
    dir = 'left';
    addFood();
    for (i = 0; i < 40; i++) {
        decPos[i] = {
            x: Math.random() * cWidth,
            y: Math.random() * cHeight
        }
    }

}

function drawCanvas() {
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', (cWidth * sqSize) + 'px');
    canvas.setAttribute('height', (cHeight * sqSize) + 'px');
    canvas.setAttribute('id', 'kanwa');
    document.body.appendChild(canvas);
}

function preventScroll() {
    window.addEventListener("keydown", function (e) {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
}

function gameFrame() {


    if (dir == 'none') return;


    switch (dir) {
        case "left":
            cx -= 1;
            break;
        case "right":
            cx += 1;
            break;
        case "up":
            cy -= 1;
            break;
        case "down":
            cy += 1;
            break;
    }
    if (cx >= cWidth || cx < 0 || cy >= cHeight || cy < 0) {
        dir = 'none';
        gameOver = true;
        return;
    }
    for (i = 0; i < snakePos.length; i++) {
        if (cx == snakePos[i].x && cy == snakePos[i].y) {
            dir = 'none';
            gameOver = true;
            return;
        }

    }

    if (grow == 0) {
        if (snakePos.length > 0) {
            var last = snakePos.pop();
            //ctx.clearRect(last.x * sqSize, last.y * sqSize, sqSize, sqSize);
        }
    } else grow -= 1;

    snakePos.unshift({
        x: cx,
        y: cy
    });
    if (cx == foodx && cy == foody) {
        grow += 1;
        addFood();
    }
    for (i = 0; i < decPos.length; i++) {
        decPos[i].x = (decPos[i].x + 1) % cWidth;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255,0,0,0)'
    for (i = 0; i < decPos.length; i++)
        ctx.fillRect(decPos[i].x * sqSize, decPos[i].y * sqSize, sqSize * sqPerc, sqSize * sqPerc);

    ctx.fillStyle = 'pink';
    ctx.fillRect(foodx * sqSize, foody * sqSize, sqSize * sqPerc, sqSize * sqPerc);
    ctx.fillStyle = 'rgba(255,0,0,1)';
    for (i = 0; i < snakePos.length; i++)
        ctx.fillRect(snakePos[i].x * sqSize, snakePos[i].y * sqSize, sqSize * sqPerc, sqSize * sqPerc);

}

function handleArrows() {
    document.addEventListener('keydown', function (event) {
        if (gameOver) {
            startGame();
            return;
        }

        const key = event.key;
        console.log(key);
        switch (event.key) {
            case "a":
                if (dir != 'right') dir = 'left';
                break;
            case "d":
                if (dir != 'left') dir = 'right';
                break;
            case "w":
                if (dir != 'down') dir = 'up';
                break;
            case "s":
                if (dir != 'up') dir = 'down';
                break;
        }
    });
}


function initGame() {
    clock = setInterval(gameFrame, 100);
    handleArrows();

}
initGame();
preventScroll();
drawCanvas();
var ctx = document.getElementById('kanwa').getContext('2d');
startGame();