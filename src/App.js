import { useReducer } from 'react';
import { gameReducer, initialState } from './game';
import './App.css';

function Square({ mark, updateMark }){
  return (
    <button className="square" onClick={updateMark}>{mark}</button>
  );
}

function Board({ board, updateGame }) {
  return (
    <div className="game-board">
      {
        board.map((rowOfMarks, row) => (
          <div className="board-row">
            {
              rowOfMarks.map((mark, col) => (
                <Square mark={mark} updateMark={() => updateGame({ row, col })} />
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

function NewGame({ newGame }) {
  return (
    <button className='new-game' onClick={newGame}>New Game</button>
    
  );
}



function App() {
  const [game, updateGame] = useReducer(gameReducer, initialState);

  return (
    <div className="game">
      <Board board={game.board} updateGame={updateGame} />
      <div className="game-info">
        <div>{game.winner}</div>
        <div>{game.error}</div>
        {game.winner ? <NewGame newGame={() => updateGame({ reset: true })} /> : null}
        <ol>{/* TODO */}</ol>
      </div>
      </div>
  );
}

export default App;
