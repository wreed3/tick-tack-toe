import { calculateWinner, isBoardFull, getBestMove } from './game';

describe('calculateWinner', () => {
  it('returns null for an empty board', () => {
    const squares = Array(9).fill(null);
    expect(calculateWinner(squares)).toBeNull();
  });

  it('detects horizontal wins', () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null];
    const result = calculateWinner(squares);
    expect(result.winner).toBe('X');
    expect(result.line).toEqual([0, 1, 2]);
  });

  it('detects vertical wins', () => {
    const squares = ['O', null, null, 'O', null, null, 'O', null, null];
    const result = calculateWinner(squares);
    expect(result.winner).toBe('O');
    expect(result.line).toEqual([0, 3, 6]);
  });

  it('detects diagonal wins', () => {
    const squares = ['X', null, null, null, 'X', null, null, null, 'X'];
    const result = calculateWinner(squares);
    expect(result.winner).toBe('X');
    expect(result.line).toEqual([0, 4, 8]);
  });

  it('returns null for a draw', () => {
    const squares = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(calculateWinner(squares)).toBeNull();
  });
});

describe('isBoardFull', () => {
  it('returns false for an empty board', () => {
    const squares = Array(9).fill(null);
    expect(isBoardFull(squares)).toBe(false);
  });

  it('returns false for a partially filled board', () => {
    const squares = ['X', 'O', null, 'X', null, null, null, null, null];
    expect(isBoardFull(squares)).toBe(false);
  });

  it('returns true for a full board', () => {
    const squares = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(isBoardFull(squares)).toBe(true);
  });
});

describe('getBestMove', () => {
  it('takes a winning move when available', () => {
    const squares = ['X', 'X', null, 'O', 'O', null, null, null, null];
    const move = getBestMove(squares, 'X');
    expect(move).toBe(2); // Winning move for X
  });

  it('blocks opponent winning move', () => {
    const squares = ['O', 'O', null, 'X', null, null, null, null, null];
    const move = getBestMove(squares, 'X');
    expect(move).toBe(2); // Block O from winning
  });

  it('takes center when available', () => {
    const squares = ['X', null, null, null, null, null, null, null, 'O'];
    const move = getBestMove(squares, 'X');
    expect(move).toBe(4); // Center square
  });

  it('returns a valid move', () => {
    const squares = ['X', 'O', 'X', null, null, null, null, null, null];
    const move = getBestMove(squares, 'O');
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThan(9);
    expect(squares[move]).toBeNull();
  });
});