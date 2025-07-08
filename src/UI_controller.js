export class UiController {
    constructor() {

    }
    async get_attack_position(player_number) {

    }
    update_ui() {

    }

    async show_winner(name) {

    }

    show_attack_result(r, c, feedback) {
        if (feedback.shoot == 2) {
            already_broken(r, c);
        }
        if (feedback.sunk !== null) {
            sunk_ship(feedback.sunk);
        }
        if (feedback.shoot == 1) {
            success_shoot(r, c);
        }
    }
    already_broken(r, c) {

    }
    sunk_ship(ship) {

    }
    success_shoot(r, c) {

    }

};