// Christian-themed Tic-Tac-Toe Game Logic
// Cross (✝) vs Fish (🐟)

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
        line: lines[i]
      };
    }
  }
  return null;
}

export function isBoardFull(squares) {
  return squares.every(square => square !== null);
}

export function getInspirationalMessage(winner, isDraw) {
  if (isDraw) {
    return "Fellowship in unity! 'How good and pleasant it is when God's people live together in unity!' - Psalm 133:1";
  }
  
  const messages = {
    '✝': "The Cross prevails! 'For the message of the cross is foolishness to those who are perishing, but to us who are being saved it is the power of God.' - 1 Corinthians 1:18",
    '🐟': "The Fish swims to victory! 'Follow me, and I will make you fishers of men.' - Matthew 4:19"
  };
  
  return messages[winner] || "Well played!";
}