
export class UiController {
    constructor() {

    }
    clear_ships() {
        this.grid_view[player_number].forEach(row => {
            row.forEach(cell => {
                cell.classList.remove("ship");
            });
        });
    }
    bindStartGame(callback) {
        document.querySelector("#start-game-btn").addEventListener("click", (e) => {

            //this.clear_ships();
            callback();
        });
    }
    init() {
        this.draw_header();
        this.draw_start_btn();
        this.draw_grids();
        this.draw_btns();
        this.randomize_init();
    }
    randomize_grid(player_number) {
        this.grid_view[player_number].forEach(row => {
            row.forEach(cell => {
                cell.classList.remove("ship");
            });
        });
        let gr = null;

        if (this.make_random_player !== null)
            gr = this.make_random_player(player_number);

        gr.forEach(ship => {
            let r = ship[0], c = ship[1], size = ship[2], dir = ship[3];
            if (dir) {
                for (let i = r; i < r + size; i++) {
                    this.grid_view[player_number][i][c].classList.add("ship");
                }
            } else {
                for (let i = c; i < c + size; i++) {
                    this.grid_view[player_number][r][i].classList.add("ship");
                }
            }
        });

    }
    randomize_init() {
        this.randomize_grid(0);
        document.querySelector(".randomize-btn").addEventListener("click", (e) => {
            this.randomize_grid(0);
        });
    }
    append_to_app(element) {
        const div_app = document.getElementById("app");
        div_app.appendChild(element);

    }
    draw_header() {

        const header = document.createElement("h1");
        header.textContent = "Battelship Game !!";
        this.append_to_app(header);

    }
    draw_start_btn() {
        const btn = document.createElement("button");
        btn.textContent = "Start Game";
        btn.id = "start-game-btn";
        this.append_to_app(btn);
    }
    draw_grids() {
        this.grid_view = [[], []];

        const leftGrid = document.createElement("div");
        leftGrid.classList.add("grid", "left-grid");

        const rightGrid = document.createElement("div");
        rightGrid.classList.add("grid", "right-grid");

        // Left Grid
        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell", "left-side");
                cell.dataset.j = j;
                cell.dataset.i = i;
                leftGrid.appendChild(cell);
                row.push(cell);
            }
            this.grid_view[0].push(row);
        }

        // Right Grid
        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell", "right-side");
                cell.dataset.j = j;
                cell.dataset.i = i;
                rightGrid.appendChild(cell);
                row.push(cell);
            }
            this.grid_view[1].push(row);
        }

        const container = document.createElement("div");
        container.classList.add("grids-container");
        container.appendChild(leftGrid);
        container.appendChild(rightGrid);
        this.append_to_app(container);
    }
    draw_btns() {
        // Create container
        const controlsContainer = document.createElement("div");
        controlsContainer.classList.add("controls-container");

        // Left randomize button
        const leftBtn = document.createElement("button");
        leftBtn.textContent = "Randomize";
        leftBtn.classList.add("randomize-btn");

        // Right randomize button
        const rightBtn = document.createElement("button");
        rightBtn.textContent = "Randomize";
        rightBtn.classList.add("randomize-btn");

        // Radio form
        const form = document.createElement("form");
        form.id = "game-mode-form";

        const singleLabel = document.createElement("label");
        const singleRadio = document.createElement("input");
        singleRadio.type = "radio";
        singleRadio.name = "mode";
        singleRadio.value = "single";
        singleRadio.checked = true;
        singleLabel.appendChild(singleRadio);
        singleLabel.appendChild(document.createTextNode("Single Player"));

        const multiLabel = document.createElement("label");
        const multiRadio = document.createElement("input");
        multiRadio.type = "radio";
        multiRadio.name = "mode";
        multiRadio.value = "multi";
        //multiLabel.appendChild(multiRadio);
        //multiLabel.appendChild(document.createTextNode("Multiplayer"));

        form.appendChild(singleLabel);
        form.appendChild(multiLabel);

        // Append elements in order
        controlsContainer.appendChild(leftBtn);
        controlsContainer.appendChild(form);
        //controlsContainer.appendChild(rightBtn);

        // Append to app
        this.append_to_app(controlsContainer);

    }
    add_focus(player_number) {
        this.grid_view[player_number].forEach(row => {
            row.forEach(cell => {
                cell.classList.add("focus");
            });
        });
        this.grid_view[1 - player_number].forEach(row => {
            row.forEach(cell => {
                cell.classList.remove("focus");
            });
        });
    }
    async get_attack_position(player_number) {
        player_number = 1 - player_number;
        this.add_focus(1 - player_number);
        return new Promise((resolve) => {
            this.grid_view[player_number].forEach(row => {
                row.forEach(cell => {
                    const handler = (e) => {
                        const j = parseInt(e.target.dataset.j);
                        const i = parseInt(e.target.dataset.i);

                        // Remove all other listeners to prevent multiple triggers
                        this.grid_view[player_number].forEach(r => {
                            r.forEach(c => c.removeEventListener("click", handler));
                        });

                        resolve([i, j]);
                    };

                    cell.addEventListener("click", handler);
                });
            });
        });
    }

    update_ui() {

    }

    async show_winner(name) {

    }

    show_attack_result(r, c, feedback, player_number) {
        console.log(feedback);
        if (feedback.shoot == 2) {
            this.already_broken(r, c);
            return;
        }
        if (feedback.sunk !== null) {
            this.sunk_ship(feedback.sunk);
        }
        if (feedback.shoot == 1) {
            this.success_shoot(r, c, player_number);
        } else {
            this.miss_shoot(r, c, player_number)
        }
    }
    already_broken(r, c) {
        alert("already broken");
    }
    sunk_ship(ship) {
        alert("Ship Sunk blo blo blo blo ~ ~ ~");
    }
    success_shoot(r, c, player_number) {
        this.grid_view[1 - player_number][r][c].classList.add("hit");
    }
    miss_shoot(r, c, player_number) {
        this.grid_view[1 - player_number][r][c].classList.add("miss");
    }

};