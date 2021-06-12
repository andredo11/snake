function drawCanvas() {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', '1000px');
    canvas.setAttribute('height', '750px');
    canvas.setAttribute('id', 'kanwa');
    document.body.appendChild(canvas);
}
var direction = 'none';

var square = 50;
var snakePosition = [
    [10, 8],
    [10, 8],
    [9, 8]
];
var snakeLength = 2;

var foodPosition = [Math.floor(Math.random() * (40 - 1) + 1) * 50,
    Math.floor(Math.random() * (15 - 8) + 8) * 50
];

function preventScroll() {
    window.addEventListener("keydown", function (e) {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
}

function gameFrame() {

    ctx.clearRect(snakePosition[snakeLength][0] * square, snakePosition[snakeLength][1] * square, square, square);


    for (i = snakeLength; i > 0; i--) {
        snakePosition[i][0] = snakePosition[i - 1][0];
        snakePosition[i][1] = snakePosition[i - 1][1];

    }
    switch (direction) {
        case "left":
            snakePosition[0][0] -= 1;
            break;
        case "right":
            snakePosition[0][0] += 1;
            break;
        case "up":
            snakePosition[0][1] -= 1;
            break;
        case "down":
            snakePosition[0][1] += 1;
            break;
        case 'none':
            snakePosition[0][0] += 1;
            break;
    }
    ctx.fillStyle = 'red';


    for (i = 0; i <= snakeLength; i++) {
        ctx.fillRect(snakePosition[i][0] * square, snakePosition[i][1] * square, square, square);
    }

}

function handleArrows() {
    document.addEventListener('keydown', function (event) {
        const key = event.key;
        switch (event.key) {
            case "ArrowLeft":
                if (direction != 'right' && direction != 'none') {
                    direction = 'left';
                    break;
                }
                break;
            case "ArrowRight":
                if (direction != 'left') {
                    direction = 'right';
                    break;
                }
                break;
            case "ArrowUp":
                if (direction != 'down') {
                    direction = 'up';
                    break;
                }
                break;
            case "ArrowDown":
                if (direction != 'up') {
                    direction = 'down';
                    break;
                }
                break;
        }
    });
}


function startGame(difficulty) {
    clock = setInterval(gameFrame, 100);
    handleArrows();

}

preventScroll();
drawCanvas();
var ctx = document.getElementById('kanwa').getContext('2d');
startGame();
console.log(foodPosition);
console.log(foodPosition[1]);