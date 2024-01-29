import { BLUE, CYAN, LIME, Game, WHITE, YELLOW, wave } from "@vaguevoid/sdk"

const state = {
  rotation: 0,
  scale: 1,
  alpha: 1,
}

export default () =>
  new Game(state, {
    start() {},

    update(state, { frame }) {
      state.rotation += Math.PI / 180

      state.scale = wave(frame / 10, 0.5, 1.5)

      state.alpha = wave(frame / 20, 0, 1)
    },

    paint(painter, { state, painter: { width, height } }) {
      const { rotation, scale, alpha } = state
      painter.rect({
        color: LIME,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        anchor: "topLeft",
        rotation,
      })
      painter.rect({
        color: CYAN,
        x: width,
        y: 0,
        width: 100,
        height: 100,
        anchor: "topRight",
        rotation,
      })
      painter.rect({
        color: YELLOW,
        x: 0,
        y: height,
        width: 100,
        height: 100,
        anchor: "bottomLeft",
        rotation,
      })
      painter.rect({
        color: BLUE,
        x: width,
        y: height,
        width: 100,
        height: 100,
        anchor: "bottomRight",
        rotation,
      })
      painter.rect({
        color: [1, 0, 0.5, 1],
        x: width / 2,
        y: height / 2,
        width: 200,
        height: 200,
        anchor: "center",
        rotation,
      })

      painter.circle({
        color: LIME,
        x: width / 4,
        y: height / 4,
        radius: 25,
        anchor: "center",
        scale,
      })
      painter.circle({
        color: CYAN,
        x: (3 * width) / 4,
        y: height / 4,
        radius: 25,
        anchor: "center",
        scale,
      })
      painter.circle({
        color: YELLOW,
        x: width / 4,
        y: (3 * height) / 4,
        radius: 25,
        anchor: "center",
        scale,
      })
      painter.circle({
        color: BLUE,
        x: (3 * width) / 4,
        y: (3 * height) / 4,
        radius: 25,
        anchor: "center",
        scale,
      })
      painter.circle({
        color: WHITE,
        x: width / 2,
        y: height / 2,
        radius: 50,
        anchor: "center",
        rotation,
      })
      painter.rect({
        color: [0.4, 0.2, 0.6, alpha],
        x: width / 2,
        y: height / 4,
        width: 110,
        height: 110,
        anchor: "topCenter",
      })
    },
  })
