import { Board } from '../src/model/Board';


test('Add vertical ship on (0,0)', () => {
    const board = new Board(10, 10);
    expect(board.add_ship(0, 0, 5, 1)).toBe(true);
    expect(board.check_cell(0, 0)).toBe(1);
    expect(board.check_cell(1, 0)).toBe(1);
    expect(board.check_cell(2, 0)).toBe(1);
    expect(board.check_cell(3, 0)).toBe(1);
    expect(board.check_cell(4, 0)).toBe(1);
    expect(board.check_cell(5, 0)).toBe(0);
});

test('Add horizontal ship on (0,0)', () => {
    const board = new Board(10, 10);
    expect(board.add_ship(0, 0, 5, 0)).toBe(true);
    expect(board.check_cell(0, 0)).toBe(1);
    expect(board.check_cell(0, 1)).toBe(1);
    expect(board.check_cell(0, 2)).toBe(1);
    expect(board.check_cell(0, 3)).toBe(1);
    expect(board.check_cell(0, 4)).toBe(1);
    expect(board.check_cell(0, 5)).toBe(0);
});

test('Add non-overlapping ships', () => {
    const board = new Board(10, 10);
    expect(board.add_ship(0, 0, 5, 0)).toBe(true);
    expect(board.add_ship(2, 0, 5, 1)).toBe(true);
    expect(board.check_cell(0, 0)).toBe(1);
    expect(board.check_cell(0, 1)).toBe(1);
    expect(board.check_cell(0, 2)).toBe(1);
    expect(board.check_cell(0, 3)).toBe(1);
    expect(board.check_cell(0, 4)).toBe(1);
    expect(board.check_cell(0, 5)).toBe(0);
    expect(board.check_cell(1, 0)).toBe(0);
    expect(board.check_cell(2, 0)).toBe(1);
    expect(board.check_cell(3, 0)).toBe(1);
    expect(board.check_cell(4, 0)).toBe(1);
    expect(board.check_cell(5, 0)).toBe(1);
    expect(board.check_cell(6, 0)).toBe(1);
});
test('Add non-overlapping ships', () => {
    const board = new Board(10, 10);
    expect(board.add_ship(0, 0, 5, 0)).toBe(true);
    expect(board.add_ship(0, 0, 5, 1)).toBe(false);
    expect(board.check_cell(0, 0)).toBe(1);
    expect(board.check_cell(0, 1)).toBe(1);
    expect(board.check_cell(0, 2)).toBe(1);
    expect(board.check_cell(0, 3)).toBe(1);
    expect(board.check_cell(0, 4)).toBe(1);
    expect(board.check_cell(0, 5)).toBe(0);
    expect(board.check_cell(0, 0)).toBe(1);
    expect(board.check_cell(1, 0)).toBe(0);
    expect(board.check_cell(2, 0)).toBe(0);
    expect(board.check_cell(3, 0)).toBe(0);
    expect(board.check_cell(4, 0)).toBe(0);
    expect(board.check_cell(5, 0)).toBe(0);
    expect(board.check_cell(6, 0)).toBe(0);
});

test('Add out-of-bound ships', () => {
    const board = new Board(10, 10);
    expect(board.add_ship(-1, 0, 5, 0)).toBe(false);
    expect(board.add_ship(6, 0, 5, 1)).toBe(false);
    expect(board.check_cell(0, 0)).toBe(0);
    expect(board.check_cell(0, 1)).toBe(0);
    expect(board.check_cell(0, 2)).toBe(0);
    expect(board.check_cell(0, 3)).toBe(0);
    expect(board.check_cell(0, 4)).toBe(0);
    expect(board.check_cell(0, 5)).toBe(0);
    expect(board.check_cell(0, 0)).toBe(0);
    expect(board.check_cell(1, 0)).toBe(0);
    expect(board.check_cell(2, 0)).toBe(0);
    expect(board.check_cell(3, 0)).toBe(0);
    expect(board.check_cell(4, 0)).toBe(0);
    expect(board.check_cell(5, 0)).toBe(0);
    expect(board.check_cell(6, 0)).toBe(0);
});