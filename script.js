var cx, cy, grow, snakePos, dir, canvas;
var decPos = [];
var sq = 25;
var sqPerc = 0.8;
var cHeight = 30,
    cWidth = 50;
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
    grow = 25;
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
    canvas.setAttribute('width', (cWidth * sq) + 'px');
    canvas.setAttribute('height', (cHeight * sq) + 'px');
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
var lm = -1;

function gameFrame(mstm) {

    tm = mstm / 1000;
    gtm = Math.floor(mstm / 100);
    if (dir == 'none') return;

    if (gtm != lm) {
        lm = gtm;
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


        if (cx >= cWidth || cx < 0) {
            cx = (cx + cWidth) % cWidth;
            cy = Math.floor(Math.random() * cHeight);
        }
        /*for (i = 0; i < snakePos.length; i++) {
            if (cx == snakePos[i].x && cy == snakePos[i].y) {
                dir = 'none';
                gameOver = true;
                return;
            }

        }*/

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
            grow += 5;
            addFood();
        }
        for (i = 0; i < decPos.length; i++) {
            decPos[i].x = (decPos[i].x + 1) % cWidth;
        }
    }



    ctx.fillStyle = 'rgba(34,34,34,' + (Math.sin(tm * 0.3) * 0.5 + 0.5) + ')';
    ctx.fillStyle = 'rgba(34,34,34,' + 0.05 + ')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    var sc = 1.0 + Math.sin(tm * 0.5) * 0.1;
    ctx.scale(sc, sc);
    ctx.rotate(Math.sin(tm * 0.1) * 0.1);
    var sx = -canvas.width / 2,
        sy = -canvas.height / 2;





    for (i = 0; i < cHeight; i++) {
        for (j = 0; j < cWidth; j++) {
            ctx.fillStyle = 'rgba(' + (Math.sin(tm * 0.1 + j * 0.1) * 100 + 150) + ',' + (Math.sin(tm * 0.2 + i * 0.13) * 100 + 150) + ',' + (Math.sin(tm * 0.3) * 100 + 150) + ',1)';
            var a = Math.sin(tm + (j * -0.07) + i * 0.05) * 0.3 + 0.4;
            ctx.fillRect(sx + j * sq, sy + i * sq, 0.9 * sq, a * sq);
            ctx.fillRect(sx + j * sq, sy + i * sq, a * sq, 0.9 * sq);
        }
    }

    ctx.fillStyle = 'white';
    ctx.fillRect(Math.sin(tm * 0.5) * 100, Math.cos(tm * 0.5) * 100, sq, sq);
    ctx.fillStyle = 'rgba(255,0,0,0)'
    for (i = 0; i < decPos.length; i++)
        ctx.fillRect(decPos[i].x * sq, decPos[i].y * sq, sq * sqPerc, sq * sqPerc);

    ctx.fillStyle = 'white';
    ctx.fillRect(sx + foodx * sq, sy + foody * sq, sq * sqPerc, sq * sqPerc);
    ctx.fillStyle = 'white';
    for (i = 0; i < snakePos.length; i++)
        ctx.fillRect(sx + snakePos[i].x * sq, sy + snakePos[i].y * sq, sq * sqPerc, sq * sqPerc);
    ctx.restore();
    requestAnimationFrame(gameFrame);

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
    requestAnimationFrame(gameFrame);
    handleArrows();

}
initGame();
preventScroll();
drawCanvas();
var ctx = document.getElementById('kanwa').getContext('2d');
startGame();