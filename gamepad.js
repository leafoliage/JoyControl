const HID = require("node-hid")

const targetList = [
    { vendorId: 1133, productId: 49693 }
]

let gamepad
let gamepadData = []

const restructure = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

const connect = () => {
    Array.from(HID.devices()).forEach(device => {
        targetList.forEach(target => {
            if (target.productId === device.productId && target.vendorId === device.vendorId) {
                gamepad = new HID.HID(device.vendorId, device.productId)
                console.log("gamepad connected")
            }
        })
    })
}

const povToAngle = (pov) => {
    if (!pov) return NaN
    return Math.round(11.25 * pov - 45)
}

class Device {
    static run() {
        do connect(); while (!gamepad)

        gamepad.on("data", (rawData) => {
            const { data } = restructure(rawData)
            gamepadData = Array.from(data)
        })

        gamepad.on("error", (err) => {
            console.log("Error:", err.message)
            gamepad = undefined
            this.run()
        })
    }

    static getAButton() { return gamepadData[10] === 1 }

    static getBButton() { return gamepadData[10] === 2 }

    static getXButton() { return gamepadData[10] === 4 }

    static getYButton() { return gamepadData[10] === 8 }

    static getLeftBumper() { return gamepadData[10] === 16 }

    static getRightBumper() { return gamepadData[10] === 32 }

    static getPov() { return povToAngle(gamepadData[11]) }

    static getLeftTrigger() {
        return gamepadData[9] > 128 ? gamepadData[9] - 128 : 0
    }

    static getRightTrigger() {
        return gamepadData[9] < 128 ? 128 - gamepadData[9] : 0
    }

    static getLeftAxisHorz() { return gamepadData[0] - 128 }

    static getLeftAxisVert() { return gamepadData[2] - 128 }

    static getRightAxisHorz() { return gamepadData[4] - 128 }

    static getRightAxisVert() { return gamepadData[6] - 128 }
}

module.exports = Device