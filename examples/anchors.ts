import { Game, vec, wave, type Painter, Gob, MAGENTA, YELLOW, WHITE, CYAN, LIME, RED, BLUE } from "@vaguevoid/sdk"

const screen = vec(1920, 1080)
const center = screen.scale(0.5)
const topLeft = screen.scale(0.25)
const topRight = screen.scale(0.75, 0.25)
const bottomLeft = screen.scale(0.25, 0.75)
const bottomRight = screen.scale(0.75, 0.75)

const state = {
  anchors: [
    new Gob({
      anchor: "topLeft",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      color: [0.6, 0, 0, 1],
    }),
    new Gob({
      anchor: "topCenter",
      x: center.x,
      y: 0,
      width: 100,
      height: 100,
      color: [0, 0.6, 0, 1],
    }),
    new Gob({
      anchor: "topRight",
      x: screen.x,
      y: 0,
      width: 100,
      height: 100,
      color: [0, 0, 0.6, 1],
    }),
    new Gob({
      anchor: "middleLeft",
      x: 0,
      y: center.y,
      width: 100,
      height: 100,
      color: [0.8, 0, 0, 1],
    }),
    new Gob({
      anchor: "center",
      x: center.x,
      y: center.y,
      width: 100,
      height: 100,
      color: [0, 0.8, 0, 1],
    }),
    new Gob({
      anchor: "middleRight",
      x: screen.x,
      y: center.y,
      width: 100,
      height: 100,
      color: [0, 0, 0.8, 1],
    }),
    new Gob({
      anchor: "bottomLeft",
      x: 0,
      y: screen.y,
      width: 100,
      height: 100,
      color: RED,
    }),
    new Gob({
      anchor: "bottomCenter",
      x: center.x,
      y: screen.y,
      width: 100,
      height: 100,
      color: LIME,
    }),
    new Gob({
      anchor: "bottomRight",
      x: screen.x,
      y: screen.y,
      width: 100,
      height: 100,
      color: BLUE,
    }),
  ],

  pivots: [
    new Gob({
      anchor: "topLeft",
      pivot: "topLeft",
      x: topLeft.x,
      y: topLeft.y,
      color: MAGENTA,
      width: 50,
      height: 50,
    }),
    new Gob({
      anchor: "topRight",
      pivot: "topRight",
      x: topRight.x,
      y: topRight.y,
      color: YELLOW,
      width: 50,
      height: 50,
    }),
    new Gob({
      anchor: "bottomLeft",
      pivot: "bottomLeft",
      x: bottomLeft.x,
      y: bottomLeft.y,
      color: CYAN,
      width: 50,
      height: 50,
    }),
    new Gob({
      anchor: "bottomRight",
      pivot: "bottomRight",
      x: bottomRight.x,
      y: bottomRight.y,
      color: WHITE,
      width: 50,
      height: 50,
    }),
  ],
}

export default () =>
  new Game(state, {
    update(state, { frame }) {
      const now = Number(frame) / 100
      for (const anchor of state.anchors) {
        anchor.rotation = wave(now, 0, 2 * Math.PI)
        anchor.scale = wave(now, 0.5, 1)
      }

      for (const pivot of state.pivots) {
        pivot.rotation = wave(now, 0, 2 * Math.PI)
      }
    },

    paint(painter, { state }) {
      for (const anchor of state.anchors) {
        painter.rect({ ...anchor })
        drawBoundingCoords(painter, anchor)
      }

      for (const pivot of state.pivots) {
        painter.rect(pivot)
        drawBoundingCoords(painter, pivot)
      }
    },
  })

const drawBoundingCoords = (painter: Painter, gob: Gob) => {
  const [a, b, c, d] = gob.boundingCoords()
  painter.lines({ points: [a, b, c, d, a], color: WHITE, lineWidth: 5 })
}
