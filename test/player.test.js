import { Board } from '../src/model/Board';
import { Player } from '../src/model/player';

const ships_details = [[4, 1], [3, 2], [2, 3], [1, 4]];

test('test player sink a ship', () => {
    const board = new Board(10, 10);
    const ships = board.init_random(ships_details);
    const player = new Player("p1", board, ships);
    function sunk_the_ship(ship) {
        let r = ship[0];
        let c = ship[1];
        let size = ship[2];
        let dir = ship[3];
        if (dir) {
            for (let i = r; i < r + size - 1; i++) {
                expect(player.receive_attack(i, c)).toEqual({ shoot: 1, sunk: null });
            }
            expect(player.receive_attack(r + size - 1, c).shoot).toEqual(1);
        } else {
            for (let i = c; i < c + size - 1; i++) {
                expect(player.receive_attack(r, i)).toEqual({ shoot: 1, sunk: null });
            }
            expect(player.receive_attack(r, c + size - 1).shoot).toEqual(1);
        }
    }
    for (const ship of ships) {
        sunk_the_ship(ship);
    }

});