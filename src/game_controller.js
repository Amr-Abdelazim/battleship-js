import { AI_player } from "./model/AI_player";
import { Board } from "./model/Board";
import { Player } from "./model/player";
import { UiController } from "./UI_controller";
const ships_details = [[4, 1], [3, 2], [2, 3], [1, 4]];
export class GameController {

    constructor() {
        this.reset()
    }

    create_player(name) {
        const board = new Board(10, 10);
        const ships = board.init_random(ships_details);
        return new Player(name, board, ships);
    }
    create_ai_player(name) {
        const board = new Board(10, 10);
        const ships = board.init_random(ships_details);
        return new AI_player(name, board, ships);
    }
    init() {
        this.player[0] = this.create_player("humen");
        this.player[1] = this.create_ai_player("AI");
    }
    async win_check() {
        if (this.player[0].is_allSunk()) {
            this.gameover = true;
            await this.ui_controller.show_winner(this.player[1].name);
            return;
        }
        if (this.player[1].is_allSunk()) {
            this.gameover = true;
            await this.ui_controller.show_winner(this.player[0].name);
        }
    }
    async start() {
        while (!this.gameover) {
            await this.make_turn();
            this.ui_controller.update_ui();
            await this.win_check();
        }
    }
    async get_attack_position(player_number) {
        if (this.player[player_number].constructor === AI_player) {
            return this.player[player_number].get_attack_position();
        } else {
            return await this.ui_controller.get_attack_position(player_number);
        }
    }
    show_attack_result(r, c, feedback, player_number) {
        this.ui_controller.show_attack_result(r, c, feedback);
        if (this.player[player_number].constructor === AI_player) {
            this.player[player_number].set_attack_result(r, c, feedback);
        }
    }
    async play_turn(player_number) {
        let r, c;
        [r, c] = await get_attack_position(player_number);
        const feedback = this.player[1 - player_number].receive_attack(r, c);
        show_attack_result(r, c, feedback, player_number);
        if (feedback.shoot == 2) return false;
        return true;
    }
    async make_turn() {
        let res;
        if (this.turn & 1) {
            res = await this.play_turn(0);

        } else {
            res = await this.play_turn(1);
        }
        if (!res) return;
        this.turn++;
    }
    reset() {
        this.turn = 1;
        this.ui_controller = new UiController();
        this.gameover = false;
        this.player = [null, null];
        this.init();
    }


};