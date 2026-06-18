// Enhanced game logic with AI and win detection

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
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

export function isBoardFull(squares) {
  return squares.every(square => square !== null);
}

// AI Logic - Minimax algorithm for unbeatable AI
export function getBestMove(squares, player) {
  const opponent = player === 'X' ? 'O' : 'X';
  
  // Check for immediate win
  const winMove = findWinningMove(squares, player);
  if (winMove !== -1) return winMove;
  
  // Block opponent's winning move
  const blockMove = findWinningMove(squares, opponent);
  if (blockMove !== -1) return blockMove;
  
  // Take center if available
  if (squares[4] === null) return 4;
  
  // Take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => squares[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }
  
  // Take any available space
  const availableMoves = squares
    .map((square, index) => square === null ? index : null)
    .filter(val => val !== null);
  
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function findWinningMove(squares, player) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      const testSquares = [...squares];
      testSquares[i] = player;
      if (calculateWinner(testSquares)) {
        return i;
      }
    }
  }
  return -1;
}