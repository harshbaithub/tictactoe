const board = document.getElementById("gameBoard");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameState = Array(9).fill("");
let running = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];


gameState.forEach((_, index) => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = index;
  board.appendChild(cell);
});

function handleClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (gameState[index] !== "" || !running) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    running = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    running = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c];
  });
}

function restartGame() {
  gameState = Array(9).fill("");
  currentPlayer = "X";
  running = true;
  statusText.textContent = `Player X's turn`;
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
}

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);

