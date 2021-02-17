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

const run = () => {

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

    static getAButton() {
        return gamepadData[10] === 1
    }
}

module.exports = Device