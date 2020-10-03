const { Bot } = require('mousebot');

let { mouse } = new Bot();
const unitMove = 2;
let x = 500, y = 500;

const mouseMove = (xAxis, yAxis) => {
    const xMove = unitMove * xAxis
    const yMove = unitMove * yAxis
    mouse.moveSmooth(x, y, x + xMove, y + yMove);
    x += xMove;
    y += yMove;
}

module.exports = mouseMove
