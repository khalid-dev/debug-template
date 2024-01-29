import { Game, MAGENTA } from "@vaguevoid/sdk"

const state = {
  rotation: 0,
  scale: 1,
  color: MAGENTA,
}

export default () =>
  new Game(state, {
    async start(state, { painter }) {
      await painter.loadTextures(["texture.png"])
    },

    update(state, { frame }) {
      const testFrame = Number(frame)
      state.rotation = (testFrame / 100) * Math.PI
      state.scale = 1 + Math.sin(testFrame / 100) / 2
      const r = Math.abs(Math.sin(testFrame / 100))
      const g = Math.abs(Math.sin(testFrame / 50))
      const b = Math.abs(Math.sin(testFrame / 20))
      state.color = [r, g, b, 1]
    },

    paint(painter, { state, painter: { width, height } }) {
      const { rotation, scale, color } = state

      painter.texture("texture.png", { x: 0, y: 0, anchor: "topLeft", rotation, scale, color: MAGENTA })
      painter.texture("texture.png", { x: width, y: 0, anchor: "topRight", rotation, scale })
      painter.texture("texture.png", { x: 0, y: height, anchor: "bottomLeft", rotation, scale })
      painter.texture("texture.png", { x: width, y: height, anchor: "bottomRight", rotation, scale, color })

      // Manually scale it using width and height
      painter.texture("texture.png", {
        x: width / 2,
        y: height / 2,
        anchor: "center",
        rotation,
        width: 385 * scale,
        height: 555 * scale,
      })
    },
  })
