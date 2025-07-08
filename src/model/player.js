
export class Player {

    constructor(name, board, ships) {
        this.name = name;
        this.board = board;
        this.ships = ships;
    }
    isSunk_ship(ship) {// ship = [r, c, size, dir]
        let r = ship[0];
        let c = ship[1];
        let size = ship[2];
        let dir = ship[3];
        if (dir) {
            for (let i = r; i < r + size; i++) {
                if (this.board.check_cell(i, c) == 1) return false;
            }
        } else {
            for (let i = c; i < c + size; i++) {
                if (this.board.check_cell(r, i) == 1) return false;
            }
        }
        return true;
    }
    receive_attack(r, c) {
        const shoot = this.board.attack_cell(r, c);
        let sunk = null;
        for (let i = 0; i < this.ships.length; i++) {
            if (this.isSunk_ship(this.ships[i])) {
                sunk = this.ships[i];
                this.ships.splice(i, 1);
                i--;
            }
        }
        return { shoot, sunk }
    }
    is_allSunk() {
        return this.ships.length == 0;
    }



};