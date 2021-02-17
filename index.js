const gamepad  = require("./gamepad")
const {mouse, mouseMove} = require("./mouse")

let mouseClicked = false

gamepad.run()

setInterval(()=>{
    mouseMove(gamepad.getRightAxisHorz(), gamepad.getRightAxisVert())
    if (gamepad.getAButton()) mouseMove(0, 6)
    else if (gamepad.getBButton()) mouseMove(6, 0)
    else if (gamepad.getXButton()) mouseMove(-6, 0)
    else if (gamepad.getYButton()) mouseMove(0, -6)
}, 1)

setInterval(()=>{
    if (gamepad.getRightBumper() && !mouseClicked) {
        mouse.click("left")
        mouseClicked = true
    } else if (!gamepad.getRightBumper()) {
        mouseClicked = false
    }
}, 100)

