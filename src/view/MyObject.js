
export class MyObject {
    constructor(x, y, windowWidth, windowHieght) {
        this.windowWidth = windowWidth;
        this.windowHieght = windowHieght;
        this.distroyed = false;
        this.x = x;
        this.y = y;
        this.angel = 0;
        this.width = 0;
        this.height = 0;
        this.allIsFine = true;
        this.speed = 0;
        this.acceleration = 0;
        this.friction = 0;
        this.maxSpeed = 0;
        this.scale = 1;
        this.iFrame = false;


    }
    addSprite(spriteImg, spriteWidths, spriteHieghts, spriteXs, spriteYs, scale, FBS) {
        this.lastTime = 0; // Tracks the last time we updated
        this.updateInterval = 1000 / FBS;
        this.scale = scale;
        this.spriteSheet = new Image();
        this.spriteSheet.src = spriteImg;
        this.allIsFine = false;
        this.spriteFrameY = 0;
        this.spriteFrameX = 0;
        this.spriteHieghts = spriteHieghts;
        this.spriteYs = spriteYs;
        this.spriteWidths = spriteWidths;
        this.spriteXs = spriteXs;
        this.spriteSheet.onload = () => {
            this.allIsFine = true;
            this.width = this.spriteWidths[0] * this.scale;
            this.height = this.spriteHieghts[0] * this.scale;
        }

    }
    drawRec(ctx) {
        ctx.beginPath();
        ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        ctx.fillStyle = 'blue';
        ctx.fill();
    }

    draw(ctx, timestamp) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angel);
        ctx.scale(this.scale, this.scale);
        let curhieght = this.spriteHieghts[this.spriteFrameY];
        let curwidth = this.spriteWidths[this.spriteFrameX];
        ctx.drawImage(
            this.spriteSheet,    // Image source
            this.spriteXs[this.spriteFrameX], this.spriteYs[this.spriteFrameY],      // Source X, Y (top-left of the frame in the sprite sheet)
            curwidth, curhieght, // Source width, height (frame size)
            -(this.width / 2) / this.scale, - (this.height / 2) / this.scale,        // Canvas X, Y (where to draw on the canvas)
            curwidth, curhieght  // Canvas width, height (resize if needed)
        );
        ctx.restore();
        const deltaTime = timestamp - this.lastTime;
        if (deltaTime >= this.updateInterval) {
            // Update the sprite positions
            this.spriteFrameY = (this.spriteFrameY + 1) % this.spriteHieghts.length;
            this.spriteFrameX = (this.spriteFrameX + 1) % this.spriteWidths.length;

            // Update lastTime to the current timestamp
            this.lastTime = timestamp;
        }
    }
    hit(obj) { }
    destroy() {
        this.destroyed = true;
        this.afterDestroy();
    }
    onTheEdge() {

    }
    afterDestroy() {
        console.log("i am destroyed ");
    }
    move() {
        let newX = this.x - Math.sin(this.angel) * this.speed;
        let newY = this.y - Math.cos(this.angel) * this.speed;
        if (newX - this.width / 2 < 0) {
            this.onTheEdge();
            return;
        }
        if (newY - this.height / 2 < 0) {
            this.onTheEdge();
            return;
        }
        if (this.windowWidth < newX + this.width / 2) {
            this.onTheEdge();
            return;
        }
        if (this.windowHieght < newY + this.height / 2) {
            this.onTheEdge();
            return;
        }
        this.x = newX;
        this.y = newY;
    }
    update(ctx, timestamp) {
        if (!this.allIsFine) {
            return;
        }
        if (this.destroyed) return;
        this.draw(ctx, timestamp);
        this.move();
    }
}