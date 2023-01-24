let playerScore = 0;
let paddle;
let ball;
let bricks;
let gameState;
let userName;

function setup() {
    createCanvas(800, 600);
    gameState = 'home';
    userName = createInput("");
    userName.position(width - 430, 45);
    paddle = new Paddle();
    ball = new Ball(paddle);
    bricks = createBricks();
}

function createBricks() {
    const bricks = []
    const numBricksPerRow = 10;
    let rows = 1;
    const brickWidth = width / numBricksPerRow;

    for (let row = 0; row < rows; row++) {
        for (let i = 0; i < numBricksPerRow; i++) {
            let brick = new Brick(createVector(brickWidth * i, 25 * row), brickWidth, 25, color(random(0, 255), random(0, 255), random(0, 255)));
            bricks.push(brick);
        }
    }

    return bricks;
}

function draw() {
    if (gameState == 'home') {
        background(0);
        textSize(45);
        fill(255);

        text("Enter your login: ", width / 45 , 60);
        text("Press Enter to Start", width / 45 , 200);
        if (keyIsDown(ENTER)) {
            gameState = 'playing';
        }
    }
    else if (gameState == 'playing') {
        background(0);
        userName.hide();
        ball.bounce();
        ball.bouncePaddle();
        ball.update();

        if (keyIsDown(LEFT_ARROW)) {
            paddle.move('left');
        }
        else if (keyIsDown(RIGHT_ARROW)) {
            paddle.move('right');
        }

        for (let i = bricks.length - 1; i >= 0; i--) {
            const brick = bricks[i];
            if (brick.isCollide(ball)) {
                ball.reverse('y');
                bricks.splice(i,1);
                playerScore += brick.points;
            }
            else {
                brick.display();
            }
        }

        paddle.display();
        ball.display();
        textSize(32);
        fill(255);
        text("User: " + userName.value(), width / 30, 50);
        text("Score: " + playerScore, width - 225, 50);


        if (ball.bottom()) {
            gameState = 'lose';
        }

        if (bricks.length === 0) {
            gameState = 'win';
            
        }
    }

    else {
        textSize(100);

        if (gameState == 'win') {
            fill(255);
            text("You Win!", width / 2 - 200, height / 2);
        }
        else if (gameState == 'lose') {
            fill(255, 0, 0);
            text("You Lose!", width / 2 - 200, height / 2)
        }

    }       
    
}