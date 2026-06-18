/**
 * Game logic for Tic-Tac-Toe
 */

/**
 * Calculate the winner of the game
 * @param {Array} squares - Array of 9 squares
 * @returns {Object|null} - Winner info or null
 */
export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
      };
    }
  }
  return null;
}

/**
 * Check if the game is a draw
 * @param {Array} squares - Array of 9 squares
 * @returns {boolean} - True if draw
 */
export function isDraw(squares) {
  return squares.every(square => square !== null) && !calculateWinner(squares);
}

/**
 * Get the best move for AI player (minimax algorithm)
 * @param {Array} squares - Current board state
 * @param {string} player - Current player ('X' or 'O')
 * @returns {number} - Best move index
 */
export function getBestMove(squares, player) {
  const opponent = player === 'X' ? 'O' : 'X';
  
  // Simple AI: Check for winning move or block opponent
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Try to win
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] === player && squares[b] === player && squares[c] === null) return c;
    if (squares[a] === player && squares[c] === player && squares[b] === null) return b;
    if (squares[b] === player && squares[c] === player && squares[a] === null) return a;
  }

  // Block opponent
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] === opponent && squares[b] === opponent && squares[c] === null) return c;
    if (squares[a] === opponent && squares[c] === opponent && squares[b] === null) return b;
    if (squares[b] === opponent && squares[c] === opponent && squares[a] === null) return a;
  }

  // Take center
  if (squares[4] === null) return 4;

  // Take corner
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => squares[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available space
  const available = squares.map((sq, i) => sq === null ? i : null).filter(i => i !== null);
  return available[Math.floor(Math.random() * available.length)];
}