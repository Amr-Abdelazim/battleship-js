import { AI_player } from "./model/AI_player";
import { Board } from "./model/Board";
import { Player } from "./model/player";
import { UiController } from "./UI_controller";
const ships_details = [[4, 1], [3, 2], [2, 3], [1, 4]];
export class GameController {
    reset() {

        this.init();
        this.init_UIcontroller();
    }
    constructor() {
        this.turn = 1;
        this.gameover = false;
        this.ui_controller = new UiController();
        this.player = [null, null];
    }
    setup() {
        this.reset();

    }
    init_UIcontroller() {


        this.ui_controller.make_custome_player = (player_number, ships) => {
            return this.player[player_number].board.init_custom(ships);
        };
        this.ui_controller.make_random_player = (player_number) => {
            return this.player[player_number].board.init_random(ships_details);
        };


        this.ui_controller.change_player_type = (player_number, type) => {
            if (type == "human") this.player[player_number] = this.create_player("human", true, null);
            else this.player[player_number] = this.create_ai_player("AI");
            return this.player[player_number].board;
        };

        this.ui_controller.get_player_status = (player_number) => {
            return {
                board: this.player[player_number].board.get_board(),
                remaining_ships: this.player[player_number].remaining_ships()
            };
        };
        this.ui_controller.init();
        this.ui_controller.bindStartGame(this.start.bind(this));




    }

    create_player(name, is_random, ships) {
        const board = new Board(10, 10);
        if (is_random)
            ships = board.init_random(ships_details);
        else if (!board.init_custom(ships)) return null;
        return new Player(name, board, ships);
    }
    create_ai_player(name) {
        const board = new Board(10, 10);
        const ships = board.init_random(ships_details);
        return new AI_player(name, board, ships);
    }
    init() {

        this.player[0] = this.create_player("human", true, null);
        this.player[1] = this.create_ai_player("AI");
        if (this.player[0] === null || this.player[1] === null)
            throw "One of the players has null value";
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
        if (this.player[player_number] instanceof AI_player) {
            return this.player[player_number].get_attack_position();
        } else {

            return await this.ui_controller.get_attack_position(player_number);
        }
    }
    show_attack_result(r, c, feedback, player_number) {
        this.ui_controller.show_attack_result(r, c, feedback, player_number);
        if (this.player[player_number] instanceof AI_player) {
            this.player[player_number].set_attack_result(r, c, feedback);
        }
    }
    async play_turn(player_number) {
        let r, c;
        [r, c] = await this.get_attack_position(player_number);

        const feedback = this.player[1 - player_number].receive_attack(r, c);
        this.show_attack_result(r, c, feedback, player_number);
        if (feedback.shoot == 2) return false;
        return true;
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
        if (this.turn % 2 == 0)
            await this.sleep(1000);

    }



};