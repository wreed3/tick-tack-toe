import React, { useState, Component } from 'react';
import './App.css';

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>We're sorry, but the game encountered an error.</p>
          <button onClick={() => window.location.reload()}>Reload Game</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Game state management with extensibility
class GameState {
  constructor() {
    this.history = [];
    this.currentMove = 0;
  }

  addMove(board, player) {
    this.history = this.history.slice(0, this.currentMove + 1);
    this.history.push({ board: [...board], player });
    this.currentMove++;
  }

  undo() {
    if (this.currentMove > 0) {
      this.currentMove--;
      return this.history[this.currentMove];
    }
    return null;
  }

  reset() {
    this.history = [];
    this.currentMove = 0;
  }

  canUndo() {
    return this.currentMove > 0;
  }
}

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameState] = useState(() => new GameState());

  const calculateWinner = (squares) => {
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
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    gameState.addMove(newBoard, isXNext ? 'X' : 'O');
    setBoard(newBoard);
    
    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
    
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    gameState.reset();
  };

  const renderSquare = (index) => {
    return (
      <button
        className="square"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const isDraw = !winner && board.every(square => square !== null);

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">
        {winner ? (
          <span className="winner">Winner: {winner}!</span>
        ) : isDraw ? (
          <span>It's a draw!</span>
        ) : (
          <span>Next player: {isXNext ? 'X' : 'O'}</span>
        )}
      </div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <TicTacToe />
    </ErrorBoundary>
  );
}

export default App;