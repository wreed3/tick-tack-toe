// 3D Tic-Tac-Toe Game Logic
// 3x3x3 cube with 27 cells

export function createGame3D() {
  return {
    board: Array(3).fill(null).map(() => 
      Array(3).fill(null).map(() => 
        Array(3).fill(null)
      )
    ),
    currentPlayer: 'X',
    winner: null,
    isDraw: false
  };
}

export function makeMove(game, x, y, z) {
  if (game.winner || game.isDraw || game.board[x][y][z]) {
    return game;
  }

  const newBoard = game.board.map((layer, lx) =>
    layer.map((row, ly) =>
      row.map((cell, lz) =>
        lx === x && ly === y && lz === z ? game.currentPlayer : cell
      )
    )
  );

  const winner = checkWinner3D(newBoard);
  const isDraw = !winner && isBoardFull(newBoard);

  return {
    board: newBoard,
    currentPlayer: winner || isDraw ? game.currentPlayer : (game.currentPlayer === 'X' ? 'O' : 'X'),
    winner,
    isDraw
  };
}

function isBoardFull(board) {
  return board.every(layer =>
    layer.every(row =>
      row.every(cell => cell !== null)
    )
  );
}

export function checkWinner3D(board) {
  // Check all rows (9 per layer, 27 total)
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      const row = [board[x][y][0], board[x][y][1], board[x][y][2]];
      const winner = checkLine(row);
      if (winner) return winner;
    }
  }

  // Check all columns (9 per layer, 27 total)
  for (let x = 0; x < 3; x++) {
    for (let z = 0; z < 3; z++) {
      const col = [board[x][0][z], board[x][1][z], board[x][2][z]];
      const winner = checkLine(col);
      if (winner) return winner;
    }
  }

  // Check vertical lines (through layers, 9 total)
  for (let y = 0; y < 3; y++) {
    for (let z = 0; z < 3; z++) {
      const vertical = [board[0][y][z], board[1][y][z], board[2][y][z]];
      const winner = checkLine(vertical);
      if (winner) return winner;
    }
  }

  // Check layer diagonals (6 total - 2 per layer)
  for (let x = 0; x < 3; x++) {
    const diag1 = [board[x][0][0], board[x][1][1], board[x][2][2]];
    const diag2 = [board[x][0][2], board[x][1][1], board[x][2][0]];
    const winner1 = checkLine(diag1);
    const winner2 = checkLine(diag2);
    if (winner1) return winner1;
    if (winner2) return winner2;
  }

  // Check vertical diagonals (going through Y axis, 6 total)
  for (let y = 0; y < 3; y++) {
    const diag1 = [board[0][y][0], board[1][y][1], board[2][y][2]];
    const diag2 = [board[0][y][2], board[1][y][1], board[2][y][0]];
    const winner1 = checkLine(diag1);
    const winner2 = checkLine(diag2);
    if (winner1) return winner1;
    if (winner2) return winner2;
  }

  // Check front-to-back diagonals (6 total)
  for (let z = 0; z < 3; z++) {
    const diag1 = [board[0][0][z], board[1][1][z], board[2][2][z]];
    const diag2 = [board[0][2][z], board[1][1][z], board[2][0][z]];
    const winner1 = checkLine(diag1);
    const winner2 = checkLine(diag2);
    if (winner1) return winner1;
    if (winner2) return winner2;
  }

  // Check 4 main 3D diagonals (corner to corner through center)
  const diag3D = [
    [board[0][0][0], board[1][1][1], board[2][2][2]],
    [board[0][0][2], board[1][1][1], board[2][2][0]],
    [board[0][2][0], board[1][1][1], board[2][0][2]],
    [board[0][2][2], board[1][1][1], board[2][0][0]]
  ];

  for (const diag of diag3D) {
    const winner = checkLine(diag);
    if (winner) return winner;
  }

  return null;
}

function checkLine(line) {
  if (line[0] && line[0] === line[1] && line[1] === line[2]) {
    return line[0];
  }
  return null;
}