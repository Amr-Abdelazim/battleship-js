export class Board {

    constructor(width, height) {
        this.board = Array.from({ length: height }, () => Array(width).fill(0));
        this.width = width;
        this.height = height;
    }
    check_adjacent(r, c) {
        const dx = [0, 0, 0, 1, 1, 1, -1, -1, -1];
        const dy = [0, 1, -1, 0, 1, -1, 0, 1, -1];
        for (let k = 0; k < 9; k++) {
            let nr = r + dx[k];
            let nc = c + dy[k];
            if (nr >= 0 && nr < this.height && nc >= 0 && nc < this.width && this.board[nr][nc]) return true;
        }
        return false;
    }
    add_ship_validation(r, c, size, dir) {
        if (c < 0 || c >= this.width || r < 0 || r >= this.height)
            return false;
        // Horizontal: dir = 0; -- vertical: dir = 1;
        if (dir) {
            if (r + size >= this.height) return false;
            for (let i = r; i < r + size; i++) {
                if (this.check_adjacent(i, c)) return false;
            }
            return true;
        } else {
            if (c + size >= this.width) return false;
            for (let i = c; i < c + size; i++) {
                if (this.check_adjacent(r, i)) return false;
            }
            return true;
        }
    }
    add_ship(r, c, size, dir) { // Horizontal: left to right -- vertical: top to bottom.
        if (!this.add_ship_validation(r, c, size, dir))
            return false;
        // Horizontal: dir = 0; -- vertical: dir = 1;
        if (dir) {
            for (let i = r; i < r + size; i++) {
                this.board[i][c] = 1;
            }
        } else {
            for (let i = c; i < c + size; i++) {
                this.board[r][i] = 1;
            }
        }
        return true;
    }
    check_cell(r, c) {
        return this.board[r][c];
    }
    #randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    init_custom(ships) {
        let r, c, size, dir;
        for (let ship of ships) {
            [r, c, size, dir] = ship;
            if (!this.add_ship_validation(r, c, size, dir)) return false;
        }
        for (let ship of ships) {
            [r, c, size, dir] = ship;
            this.add_ship(r, c, size, dir);
        }
        return true;
    }
    init_random(ships_details) {
        let ships = [];
        for (const [size, count] of ships_details) {
            for (let i = 0; i < count; i++) {
                while (true) {
                    let r = this.#randomInt(0, this.height);
                    let c = this.#randomInt(0, this.width);
                    let dir = this.#randomInt(0, 1);
                    if (this.add_ship(r, c, size, dir)) {
                        ships.push([r, c, size, dir]);
                        break;
                    }
                }
            }
        }
        return ships;
    }
    attack_cell(r, c) {
        const ans = this.board[r][c];
        this.board[r][c] = 2;// attacked
        return ans;
    }
    print() {
        for (let i = 0; i < this.height; i++) {
            console.log(this.board[i]);
        }
    }
};