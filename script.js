// Code JavaScript du jeu du serpent

// Initialisation du jeu
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var boxSize = 20;
var snake = [];
snake[0] = { x: 10, y: 10 };
var food = { x: Math.floor(Math.random() * (canvas.width / boxSize)), y: Math.floor(Math.random() * (canvas.height / boxSize)) };
var score = 0;
var direction;
var gameover = false;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  var key = event.keyCode;
  if (key == 37 && direction != "right") direction = "left";
  else if (key == 38 && direction != "down") direction = "up";
  else if (key == 39 && direction != "left") direction = "right";
  else if (key == 40 && direction != "up") direction = "down";
}

function collision(head, array) {
  for (var i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) return true;
  }
  return false;
}

function draw() {
  // Dessin du canvas
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Dessin du serpent
for (var i = 0; i < snake.length; i++) {
  context.fillStyle = "green"; // Couleur du serpent
  context.strokeStyle = "darkgreen"; // Couleur de la bordure du serpent
  context.lineWidth = 1; // Épaisseur de la bordure du serpent
  context.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
  context.strokeRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
}


  // Dessin de la nourriture
  context.fillStyle = "#FF0000";
  context.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

  // Mise à jour de la position du serpent
  var snakeX = snake[0].x;
  var snakeY = snake[0].y;

  if (direction == "left") snakeX--;
  if (direction == "up") snakeY--;
  if (direction == "right") snakeX++;
  if (direction == "down") snakeY++;

  // Détection de la collision avec la nourriture
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = { x: Math.floor(Math.random() * (canvas.width / boxSize)), y: Math.floor(Math.random() * (canvas.height / boxSize)) };
    document.getElementById("scoreValue").textContent = score; // Mise à jour du score affiché
  } else {
    snake.pop();
  }

  // Nouvelle tête du serpent
  var newHead = { x: snakeX, y: snakeY };

  // Détection de la collision avec le mur ou avec le corps du serpent
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width / boxSize ||
    snakeY >= canvas.height / boxSize ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    gameover = true;
  }

  // Ajout de la nouvelle tête au serpent
  snake.unshift(newHead);

  // Affichage du score
  context.fillStyle = "#000000";
  context.font = "20px Montserrat";
  

  // Affichage du message de Game Over
  if (gameover) {
    context.fillStyle = "red";
    context.font = "32px Arial";
    var gameOverTextWidth = context.measureText("Game Over").width;
    context.fillText("Game Over", (canvas.width - gameOverTextWidth) / 2, canvas.height / 2);
  }
}

// Boucle du jeu
var game = setInterval(draw, 200);
