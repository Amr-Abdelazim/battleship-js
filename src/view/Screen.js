export class Screen {

    constructor() {
        this.canvas = document.getElementById("game_canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.update = this.update.bind(this);
    }
    render() {
        // Button data
        const button = {
            x: 300,
            y: 250,
            width: 200,
            height: 60,
            text: "Start Game",
            hover: false
        };

        // Draw button function
        function drawButton(ctx, canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

            ctx.fillStyle = button.hover ? "#66bb6a" : "#4caf50";
            ctx.fillRect(button.x, button.y, button.width, button.height);

            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.strokeRect(button.x, button.y, button.width, button.height);

            ctx.fillStyle = "#ffffff";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
        }

        // Check if point is inside button
        function isInsideButton(x, y) {
            return (
                x >= button.x &&
                x <= button.x + button.width &&
                y >= button.y &&
                y <= button.y + button.height
            );
        }

        // Mouse move = hover effect
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const hovering = isInsideButton(mouseX, mouseY);
            if (hovering !== button.hover) {
                button.hover = hovering;
                drawButton(this.ctx, this.canvas);
            }
        });

        // Mouse click = button click
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            if (isInsideButton(mouseX, mouseY)) {
                console.log("Button clicked!");
                // Call your game start logic here
            }
        });

        // Initial draw
        drawButton(this.ctx, this.canvas);
    }
    update(timestamp) {

        requestAnimationFrame(this.update);
    }

};