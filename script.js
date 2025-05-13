const submitBtn = document.getElementById("submit");
const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const messageDiv = document.querySelector(".message");

// ⚠ Updated to match new IDs
let player1 = "", player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();

  if (player1 && player2) {
    document.getElementById("input-area").style.display = "none";
    board.style.display = "block";
    currentPlayer = player1;
    messageDiv.textContent = `${currentPlayer}, you're up`;
  }
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWin()) {
      // ⚠ Remove comma to match Cypress expectation
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
      gameActive = false;
      return;
    }

    if (!boardState.includes("")) {
      messageDiv.textContent = `It's a draw!`;
      return;
    }

    currentSymbol = currentSymbol === "X" ? "O" : "X";
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWin() {
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[b] === boardState[c]
    ) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      return true;
    }
  }
  return false;
}
