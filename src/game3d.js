// 3D Tic-Tac-Toe Game Logic
// 4x4x4 cube with 64 cells

/**
 * Creates a new 3D game instance
 * @returns {Object} Game instance with methods and state
 */
export function createGame() {
  let board = Array(64).fill(null); // 4x4x4 = 64 cells
  let currentPlayer = 'X';
  let winner = null;
  let winningLine = null;

  /**
   * Convert 3D coordinates to 1D array index
   */
  function coordsToIndex(x, y, z) {
    return x + y * 4 + z * 16;
  }

  /**
   * Convert 1D array index to 3D coordinates
   */
  function indexToCoords(index) {
    const z = Math.floor(index / 16);
    const y = Math.floor((index % 16) / 4);
    const x = index % 4;
    return { x, y, z };
  }

  /**
   * Check if a line of 4 cells are all the same (and not null)
   */
  function checkLine(indices) {
    const values = indices.map(i => board[i]);
    if (values[0] === null) return false;
    return values.every(v => v === values[0]);
  }

  /**
   * Get all possible winning lines in 3D space
   */
  function getWinningLines() {
    const lines = [];

    // Rows (along X axis)
    for (let z = 0; z < 4; z++) {
      for (let y = 0; y < 4; y++) {
        lines.push([
          coordsToIndex(0, y, z),
          coordsToIndex(1, y, z),
          coordsToIndex(2, y, z),
          coordsToIndex(3, y, z)
        ]);
      }
    }

    // Columns (along Y axis)
    for (let z = 0; z < 4; z++) {
      for (let x = 0; x < 4; x++) {
        lines.push([
          coordsToIndex(x, 0, z),
          coordsToIndex(x, 1, z),
          coordsToIndex(x, 2, z),
          coordsToIndex(x, 3, z)
        ]);
      }
    }

    // Verticals (along Z axis)
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        lines.push([
          coordsToIndex(x, y, 0),
          coordsToIndex(x, y, 1),
          coordsToIndex(x, y, 2),
          coordsToIndex(x, y, 3)
        ]);
      }
    }

    // Diagonals within XY planes
    for (let z = 0; z < 4; z++) {
      lines.push([
        coordsToIndex(0, 0, z),
        coordsToIndex(1, 1, z),
        coordsToIndex(2, 2, z),
        coordsToIndex(3, 3, z)
      ]);
      lines.push([
        coordsToIndex(3, 0, z),
        coordsToIndex(2, 1, z),
        coordsToIndex(1, 2, z),
        coordsToIndex(0, 3, z)
      ]);
    }

    // Diagonals within XZ planes
    for (let y = 0; y < 4; y++) {
      lines.push([
        coordsToIndex(0, y, 0),
        coordsToIndex(1, y, 1),
        coordsToIndex(2, y, 2),
        coordsToIndex(3, y, 3)
      ]);
      lines.push([
        coordsToIndex(3, y, 0),
        coordsToIndex(2, y, 1),
        coordsToIndex(1, y, 2),
        coordsToIndex(0, y, 3)
      ]);
    }

    // Diagonals within YZ planes
    for (let x = 0; x < 4; x++) {
      lines.push([
        coordsToIndex(x, 0, 0),
        coordsToIndex(x, 1, 1),
        coordsToIndex(x, 2, 2),
        coordsToIndex(x, 3, 3)
      ]);
      lines.push([
        coordsToIndex(x, 3, 0),
        coordsToIndex(x, 2, 1),
        coordsToIndex(x, 1, 2),
        coordsToIndex(x, 0, 3)
      ]);
    }

    // 4 main 3D diagonals (corner to corner)
    lines.push([
      coordsToIndex(0, 0, 0),
      coordsToIndex(1, 1, 1),
      coordsToIndex(2, 2, 2),
      coordsToIndex(3, 3, 3)
    ]);
    lines.push([
      coordsToIndex(3, 0, 0),
      coordsToIndex(2, 1, 1),
      coordsToIndex(1, 2, 2),
      coordsToIndex(0, 3, 3)
    ]);
    lines.push([
      coordsToIndex(0, 3, 0),
      coordsToIndex(1, 2, 1),
      coordsToIndex(2, 1, 2),
      coordsToIndex(3, 0, 3)
    ]);
    lines.push([
      coordsToIndex(3, 3, 0),
      coordsToIndex(2, 2, 1),
      coordsToIndex(1, 1, 2),
      coordsToIndex(0, 0, 3)
    ]);

    return lines;
  }

  /**
   * Check for a winner
   */
  function checkWinner() {
    const lines = getWinningLines();
    for (const line of lines) {
      if (checkLine(line)) {
        winner = board[line[0]];
        winningLine = line;
        return winner;
      }
    }
    return null;
  }

  /**
   * Check if the game is a draw
   */
  function isDraw() {
    return !winner && board.every(cell => cell !== null);
  }

  /**
   * Make a move at the given index
   */
  function makeMove(index) {
    if (board[index] !== null || winner) {
      return false;
    }
    board[index] = currentPlayer;
    checkWinner();
    if (!winner) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    return true;
  }

  /**
   * Reset the game
   */
  function reset() {
    board = Array(64).fill(null);
    currentPlayer = 'X';
    winner = null;
    winningLine = null;
  }

  /**
   * Get the current game state
   */
  function getState() {
    return {
      board: [...board],
      currentPlayer,
      winner,
      winningLine,
      isDraw: isDraw()
    };
  }

  return {
    makeMove,
    reset,
    getState,
    coordsToIndex,
    indexToCoords
  };
}