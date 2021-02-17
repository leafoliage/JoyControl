const { Bot } = require('mousebot');

let { mouse } = new Bot();
const unitMove = 0.1;
let x = 500, y = 500;

const mouseMove = (xAxis, yAxis) => {
    if ((!xAxis || !yAxis) && xAxis!==0 && yAxis!==0) return
    const xMove = Math.abs(xAxis) > 5 ? unitMove * xAxis : 0
    const yMove = Math.abs(yAxis) > 5 ? unitMove * yAxis : 0
    mouse.move(x+xMove, y+yMove)
    x += xMove;
    y += yMove;
}

module.exports = {
    mouse,
    mouseMove
}
