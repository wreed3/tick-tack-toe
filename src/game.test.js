import { initialState, reducer } from "./game";

test('marks an X on the first move', () => {
  const row = Math.floor(Math.random() * 3); // 0, 1, 2
  const col = Math.floor(Math.random() * 3); // 0, 1, 2

  const nextState = reducer(initialState, { row, col });

  expect(nextState.player).toEqual('O');
  expect(nextState.board[row][col]).toEqual('X');
});

test('marks an O on the second move', () => {
  const firstState = reducer(initialState, { row: 0, col: 0 });
  const secondState = reducer(firstState, { row: 1, col: 0 });

  expect(secondState.player).toEqual('X');
  expect(secondState.board[0][0]).toEqual('X');
  expect(secondState.board[1][0]).toEqual('O');
});

test('cannot mark an already taken square', () => {
  const firstState = reducer(initialState, { row: 0, col: 0 });
  const secondState = reducer(firstState, { row: 0, col: 0 });

  expect(secondState.player).toEqual('O');
  expect(secondState.board[0][0]).toEqual('X');
  expect(secondState.error).toEqual('Illegal move');
});

test('sets a winner', () => {
  const beforeWinningState = {
    player: 'X',
    board: [
      ['X', 'O', ''],
      ['O', 'X', ''],
      ['', '', ''],
    ],
    winner: null,
  };

  const winningState = reducer(beforeWinningState, { row: 2, col: 2 });

  expect(winningState.board[2][2]).toEqual('X');
  expect(winningState.winner).toEqual('X');
});
