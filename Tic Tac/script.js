let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const gameBoard = document.getElementById('game-board');
const turnDisplay = document.getElementById('turn');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');
const resetButton = document.getElementById('reset');

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

// Create the game board dynamically
function createBoard() {
  gameBoard.innerHTML = '';
  board.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
  });
}

// Handle a cell click
function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  checkWinner();
  switchPlayer();
}

// Check if there's a winner
function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      updateScore();
      setTimeout(() => alert(`${currentPlayer} wins!`), 10);
      return;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    setTimeout(() => alert('It\'s a draw!'), 10);
  }
}

// Switch player turn
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

// Update the score
function updateScore() {
  if (currentPlayer === 'X') {
    scoreX++;
    scoreXDisplay.textContent = scoreX;
  } else {
    scoreO++;
    scoreODisplay.textContent = scoreO;
  }
}

// Reset the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  createBoard();
  turnDisplay.textContent = 'Player X\'s Turn';
}

resetButton.addEventListener('click', resetGame);

createBoard(); // Initialize the game