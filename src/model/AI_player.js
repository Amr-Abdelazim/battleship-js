import { Player } from "./player";

export class AI_player extends Player {

    constructor(name, board, ships) {
        super(name, board, ships);
        this.op_board = Array.from({ length: board.height }, () => Array(board.width).fill(0));
    }
    #randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    get_attack_position() {
        let zeros = [];
        let dx = [0, 0, 1, -1];
        let dy = [1, -1, 0, 0];
        for (let i = 0; i < this.board.height; i++) {
            for (let j = 0; j < this.board.width; j++) {
                if (this.op_board[i][j] == 0) {
                    zeros.push([i, j]);
                    for (let k = 0; k < 4; k++) {
                        let ni = i + dx[k], nj = j + dy[k];
                        if (ni < 0 || ni >= this.board.height || nj < 0 || nj >= this.board.width)
                            continue;
                        if (this.op_board[i][j] == 1) {
                            return [i, j];
                        }
                    }
                }
            }
        }
        let index = this.#randomInt(0, zeros.length - 1);
        return zeros[index];
    }
    set_attack_result(r, c, feedback) {
        this.op_board[r][c] = 2;// attacked empty cell
        if (feedback.shoot == 0) return;
        this.op_board[r][c] = 1;// attacked ship
        if (feedback.sunk !== null) {
            let size, dir;
            [r, c, size, dir] = feedback.sunk;
            // Horizontal: dir = 0; -- vertical: dir = 1;
            if (dir) {
                for (let i = r; i < r + size; i++) {
                    this.board[i][c] = 3;// attacked sunk ship
                }
            } else {
                for (let i = c; i < c + size; i++) {
                    this.board[r][i] = 3;// attacked sunk ship
                }
            }
        }
    }
}