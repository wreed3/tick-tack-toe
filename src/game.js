// 3D Tic-Tac-Toe Game Logic
// Board is a 3x3x3 cube (27 cells)
// Cells are indexed as [layer][row][col] where layer is z-axis (0-2)

const createBoard = () => {
  return Array(3).fill(null).map(() => 
    Array(3).fill(null).map(() => 
      Array(3).fill(null)
    )
  );
};

const checkWinner = (board) => {
  // Check all possible winning lines in 3D space
  // Total: 49 possible winning lines
  // - 9 rows per layer (3 layers) = 27
  // - 9 columns per layer (3 layers) = 27  
  // - 9 vertical lines through layers = 9
  // - 4 diagonals per layer (3 layers) = 12
  // - 4 space diagonals through the cube = 4
  
  // Helper to check if three cells are the same and not null
  const checkLine = (cells) => {
    if (cells[0] && cells[0] === cells[1] && cells[1] === cells[2]) {
      return cells[0];
    }
    return null;
  };

  // Check horizontal rows in each layer
  for (let z = 0; z < 3; z++) {
    for (let y = 0; y < 3; y++) {
      const winner = checkLine([board[z][y][0], board[z][y][1], board[z][y][2]]);
      if (winner) return winner;
    }
  }

  // Check vertical columns in each layer
  for (let z = 0; z < 3; z++) {
    for (let x = 0; x < 3; x++) {
      const winner = checkLine([board[z][0][x], board[z][1][x], board[z][2][x]]);
      if (winner) return winner;
    }
  }

  // Check vertical lines through layers
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const winner = checkLine([board[0][y][x], board[1][y][x], board[2][y][x]]);
      if (winner) return winner;
    }
  }

  // Check diagonals in each layer
  for (let z = 0; z < 3; z++) {
    // Main diagonal
    let winner = checkLine([board[z][0][0], board[z][1][1], board[z][2][2]]);
    if (winner) return winner;
    // Anti-diagonal
    winner = checkLine([board[z][0][2], board[z][1][1], board[z][2][0]]);
    if (winner) return winner;
  }

  // Check vertical diagonals (through layers)
  // Front to back diagonals
  for (let x = 0; x < 3; x++) {
    let winner = checkLine([board[0][0][x], board[1][1][x], board[2][2][x]]);
    if (winner) return winner;
    winner = checkLine([board[0][2][x], board[1][1][x], board[2][0][x]]);
    if (winner) return winner;
  }

  // Left to right diagonals
  for (let y = 0; y < 3; y++) {
    let winner = checkLine([board[0][y][0], board[1][y][1], board[2][y][2]]);
    if (winner) return winner;
    winner = checkLine([board[0][y][2], board[1][y][1], board[2][y][0]]);
    if (winner) return winner;
  }

  // Check 4 space diagonals (corner to corner through cube center)
  let winner = checkLine([board[0][0][0], board[1][1][1], board[2][2][2]]);
  if (winner) return winner;
  winner = checkLine([board[0][0][2], board[1][1][1], board[2][2][0]]);
  if (winner) return winner;
  winner = checkLine([board[0][2][0], board[1][1][1], board[2][0][2]]);
  if (winner) return winner;
  winner = checkLine([board[0][2][2], board[1][1][1], board[2][0][0]]);
  if (winner) return winner;

  return null;
};

const isBoardFull = (board) => {
  return board.every(layer =>
    layer.every(row =>
      row.every(cell => cell !== null)
    )
  );
};

const makeMove = (board, z, y, x, player) => {
  if (board[z][y][x] !== null) {
    return null; // Invalid move
  }
  
  const newBoard = board.map(layer =>
    layer.map(row => [...row])
  );
  newBoard[z][y][x] = player;
  return newBoard;
};

export { createBoard, checkWinner, isBoardFull, makeMove };