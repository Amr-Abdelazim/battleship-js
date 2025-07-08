import { Board } from "./model/Board";

const board = new Board(10, 10);

const ships = board.init_random([[4, 1], [3, 2], [2, 3], [1, 4]]);
console.log(ships);
//board.print();