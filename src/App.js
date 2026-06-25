import { useState } from 'react';
import './App.css';
import { createBoard, checkWinner, isBoardFull, makeMove } from './game';
import GameBoard3D from './GameBoard3D';

function App() {
  const [board, setBoard] = useState(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningCells, setWinningCells] = useState([]);

  const handleCellClick = (z, y, x) => {
    if (winner || isDraw || board[z][y][x]) return;

    const newBoard = makeMove(board, z, y, x, currentPlayer);
    if (!newBoard) return;

    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      // You could enhance this to highlight the winning line
      setWinningCells([]);
    } else if (isBoardFull(newBoard)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(createBoard());
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
    setWinningCells([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>3D Tic-Tac-Toe</h1>
        <div className="game-info">
          {winner ? (
            <h2>🎉 Player {winner} Wins!</h2>
          ) : isDraw ? (
            <h2>🤝 It's a Draw!</h2>
          ) : (
            <h2>Current Player: {currentPlayer}</h2>
          )}
        </div>
        
        <GameBoard3D 
          board={board} 
          onCellClick={handleCellClick}
          winningCells={winningCells}
        />
        
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
        
        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>🖱️ Click and drag to rotate the cube</li>
            <li>🔍 Scroll to zoom in/out</li>
            <li>🎯 Click any empty cell to place your mark</li>
            <li>🏆 Get 3 in a row (any direction!) to win</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;