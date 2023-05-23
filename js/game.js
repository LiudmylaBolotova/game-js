const canvas = document.getElementById("game");
const repeadGameBtn = document.getElementById("button");
const ctx = canvas.getContext("2d");

const field = new Image();
field.src = "../img/playing-field.png";
const foodImage = new Image();

const fruits = [
  (apple = src = "../img/food-apple.png"),
  (amoras = src = "../img/food-amoras.png"),
  (banana = src = "../img/food-banana.png"),
  (cherry = src = "../img/food-cherry.png"),
  (limon = src = "../img/food-limon.png"),
  (pineapple = src = "../img/food-pineapple.png"),
  (plum = src = "../img/food-plum.png"),
  (orange = src = "../img/food-orange.png"),
  (strawberry = src = "../img/food-strawberry.png"),
  (pear = src = "../img/food-pear.png"),
  (watermelon = src = "../img/food-watermelon.png"),
];
const random = Math.floor(Math.random() * fruits.length);

foodImage.src = fruits[random];

repeadGameBtn.addEventListener("click", startGameNew);

const box = 32;
let score = 0;
const textGameOver = "Game Over!";

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

document.addEventListener("keydown", direction);

let dir;

function direction(e) {
  if (e.keyCode === 37 && dir !== "right") {
    dir = "left";
  }
  if (e.keyCode === 38 && dir !== "down") {
    dir = "up";
  }
  if (e.keyCode === 39 && dir !== "left") {
    dir = "right";
  }
  if (e.keyCode === 40 && dir !== "up") {
    dir = "down";
  }
}

function eatSelf(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      clearInterval(gameInterval);
      gameOver();
    }
  }
}

function gameOver() {
  ctx.fillStyle = "red";
  ctx.fillText(textGameOver, box * 5.5, box * 10);
}

function startGameNew(e) {
  if (e.target.nodeName === "BUTTON") {
    location.reload();
  }
}

function drowGame() {
  ctx.drawImage(field, 0, 0);
  ctx.drawImage(foodImage, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "red" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font = "50px Roboto ";
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === food.x && snakeY === food.y) {
    score++;

    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < 3 * box ||
    snakeY > box * 17
  ) {
    clearInterval(gameInterval);
    gameOver();
  }

  if (dir === "left") {
    snakeX -= box;
  }

  if (dir === "right") {
    snakeX += box;
  }

  if (dir === "up") {
    snakeY -= box;
  }

  if (dir == "down") {
    snakeY += box;
  }

  let newSnake = {
    x: snakeX,
    y: snakeY,
  };

  eatSelf(newSnake, snake);
  snake.unshift(newSnake);
}

const gameInterval = setInterval(drowGame, 300);
