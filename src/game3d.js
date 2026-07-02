// 3D Tic-Tac-Toe Game Logic
// 4x4x4 cube with 64 cells

// Constants for board dimensions
const BOARD_SIZE = 4;
const TOTAL_CELLS = BOARD_SIZE ** 3; // 64 cells

/**
 * Creates a new 3D game instance
 * @returns {Object} Game instance with methods and state
 */
export function createGame() {
  let board = Array(TOTAL_CELLS).fill(null);
  let currentPlayer = 'X';
  let winner = null;
  let winningLine = null;

  /**
   * Convert 3D coordinates to 1D array index
   * @param {number} x - X coordinate (0-3)
   * @param {number} y - Y coordinate (0-3)
   * @param {number} z - Z coordinate (0-3)
   * @returns {number} 1D array index
   * @throws {Error} If coordinates are out of bounds
   */
  function coordsToIndex(x, y, z) {
    if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE || z < 0 || z >= BOARD_SIZE) {
      throw new Error('Coordinates out of bounds');
    }
    return x + y * BOARD_SIZE + z * (BOARD_SIZE * BOARD_SIZE);
  }

  /**
   * Convert 1D array index to 3D coordinates
   * @param {number} index - 1D array index (0-63)
   * @returns {Object} Object with x, y, z coordinates
   */
  function indexToCoords(index) {
    const z = Math.floor(index / (BOARD_SIZE * BOARD_SIZE));
    const y = Math.floor((index % (BOARD_SIZE * BOARD_SIZE)) / BOARD_SIZE);
    const x = index % BOARD_SIZE;
    return { x, y, z };
  }

  /**
   * Check if a line of 4 cells are all the same (and not null)
   * @param {number[]} indices - Array of cell indices
   * @returns {boolean} True if all cells match and are not null
   */
  function checkLine(indices) {
    if (!indices || indices.length === 0) return false;
    const values = indices.map(i => board[i]);
    if (values[0] === null) return false;
    return values.every(v => v === values[0]);
  }

  /**
   * Get all possible winning lines in 3D space
   * @returns {number[][]} Array of winning line indices
   */
  function getWinningLines() {
    const lines = [];

    // Rows (along X axis)
    for (let z = 0; z < BOARD_SIZE; z++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        lines.push([
          coordsToIndex(0, y, z),
          coordsToIndex(1, y, z),
          coordsToIndex(2, y, z),
          coordsToIndex(3, y, z)
        ]);
      }
    }

    // Columns (along Y axis)
    for (let z = 0; z < BOARD_SIZE; z++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        lines.push([
          coordsToIndex(x, 0, z),
          coordsToIndex(x, 1, z),
          coordsToIndex(x, 2, z),
          coordsToIndex(x, 3, z)
        ]);
      }
    }

    // Verticals (along Z axis)
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        lines.push([
          coordsToIndex(x, y, 0),
          coordsToIndex(x, y, 1),
          coordsToIndex(x, y, 2),
          coordsToIndex(x, y, 3)
        ]);
      }
    }

    // Diagonals within XY planes
    for (let z = 0; z < BOARD_SIZE; z++) {
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
    for (let y = 0; y < BOARD_SIZE; y++) {
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
    for (let x = 0; x < BOARD_SIZE; x++) {
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
   * @returns {string|null} Winner ('X' or 'O') or null
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
   * @returns {boolean} True if game is a draw
   */
  function isDraw() {
    return !winner && board.every(cell => cell !== null);
  }

  /**
   * Make a move at the given index
   * @param {number} index - Cell index (0-63)
   * @returns {boolean} True if move was successful, false otherwise
   */
  function makeMove(index) {
    if (index < 0 || index >= TOTAL_CELLS) return false;
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
    board = Array(TOTAL_CELLS).fill(null);
    currentPlayer = 'X';
    winner = null;
    winningLine = null;
  }

  /**
   * Get the current game state
   * @returns {Object} Current game state
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