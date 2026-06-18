import { calculateWinner, isDraw, getBestMove } from './game';

describe('calculateWinner', () => {
  test('returns null for empty board', () => {
    const squares = Array(9).fill(null);
    expect(calculateWinner(squares)).toBeNull();
  });

  test('detects horizontal win', () => {
    const squares = ['X', 'X', 'X', null, 'O', null, null, 'O', null];
    const result = calculateWinner(squares);
    expect(result.winner).toBe('X');
    expect(result.line).toEqual([0, 1, 2]);
  });

  test('detects vertical win', () => {
    const squares = ['X', 'O', null, 'X', 'O', null, 'X', null, null];
    const result = calculateWinner(squares);
    expect(result.winner).toBe('X');
    expect(result.line).toEqual([0, 3, 6]);
  });

  test('detects diagonal win', () => {
    const squares = ['X', 'O', null, null, 'X', 'O', null, null, 'X'];
    const result = calculateWinner(squares);
    expect(result.winner).toBe('X');
    expect(result.line).toEqual([0, 4, 8]);
  });

  test('returns null when no winner', () => {
    const squares = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O'];
    expect(calculateWinner(squares)).toBeNull();
  });
});

describe('isDraw', () => {
  test('returns false for empty board', () => {
    const squares = Array(9).fill(null);
    expect(isDraw(squares)).toBe(false);
  });

  test('returns false when game in progress', () => {
    const squares = ['X', 'O', 'X', null, null, null, null, null, null];
    expect(isDraw(squares)).toBe(false);
  });

  test('returns true for draw game', () => {
    const squares = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O'];
    expect(isDraw(squares)).toBe(true);
  });

  test('returns false when there is a winner', () => {
    const squares = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    expect(isDraw(squares)).toBe(false);
  });
});

describe('getBestMove', () => {
  test('takes winning move when available', () => {
    const squares = ['X', 'X', null, 'O', 'O', null, null, null, null];
    const move = getBestMove(squares, 'X');
    expect(move).toBe(2);
  });

  test('blocks opponent winning move', () => {
    const squares = ['O', 'O', null, 'X', null, null, null, null, null];
    const move = getBestMove(squares, 'X');
    expect(move).toBe(2);
  });

  test('takes center when available', () => {
    const squares = ['X', null, null, null, null, null, null, null, 'O'];
    const move = getBestMove(squares, 'X');
    expect(move).toBe(4);
  });

  test('returns a valid move', () => {
    const squares = ['X', 'O', 'X', null, null, null, null, null, null];
    const move = getBestMove(squares, 'O');
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThan(9);
    expect(squares[move]).toBeNull();
  });
});