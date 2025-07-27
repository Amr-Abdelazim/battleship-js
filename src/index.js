import { GameController } from './game_controller';
import '../public/style.css';
import { UiController } from './UI_controller';

document.addEventListener('DOMContentLoaded', () => {
    const game = new GameController();
    game.setup();
    // Just for testing UI
    // const ui_controller = new UiController();
    // ui_controller.run();
});