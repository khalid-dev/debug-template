import {
  Gob,
  Game,
  MAGENTA,
  LIME,
  RED,
  hex,
  vec,
  WHITE,
  rgb,
  setSeed,
  shuffle,
  wave,
  YELLOW,
  raw,
} from "@vaguevoid/sdk"

const purple = hex("639")

const colors = [RED, LIME, MAGENTA, WHITE, purple]

// https://webgpufundamentals.org/webgpu/webgpu-matrix-math-transform-five-fs-3x3.html
const f = () =>
  new Gob({
    x: 0,
    y: 0,
    width: 100,
    height: 150,
    color: rgb(0, 0, 0, 0),
    tags: ["f"],
    kids: [
      {
        id: `${Math.random()}`,
        tags: ["left", "column"],
        x: 0,
        y: 0,
        width: 30,
        height: 150,
        color: purple,
      },
      {
        id: `${Math.random()}`,
        tags: ["top", "rung"],
        x: 0,
        y: 0,
        width: 100,
        height: 30,
        color: purple,
      },
      {
        id: `${Math.random()}`,
        tags: ["middle", "rung"],
        x: 0,
        y: 60,
        width: 70,
        height: 30,
        color: purple,
      },
    ],
  })

const state = {
  parent: new Gob({
    x: 0,
    y: 0,
    width: 200,
    color: raw(1, 0, 1, 0.5),
  }),
  boxes: new Gob({
    x: 0,
    y: 0,
    width: 100,
    color: purple,
    kids: [
      {
        id: `${Math.random()}`,
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        color: YELLOW,
        kids: [
          {
            id: `${Math.random()}`,
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            color: LIME,
          },
        ],
      },
    ],
  }),
  xOffset: 0,
}

export default () =>
  new Game(state, {
    start(state, { screen }) {
      let parent = state.parent
      let scale = vec(1, 1)
      setSeed("nice")
      shuffle(colors)
      for (let i = 0; i < 5; i++) {
        const gob = f()
        gob.x = 100
        gob.y = 20
        gob.scale = scale.mutScale(0.9).xy as [number, number]
        const color = colors[i]
        gob.kids.forEach((k) => (k.color = color))
        parent.addKid(gob)
        parent = gob
      }
    },

    update(state, { screen, frame }) {
      for (const kid of state.parent.findTag("f")) {
        kid.rotation = frame / 100
      }
      state.parent.center = vec(screen.width / 2, screen.height / 2).add(vec(wave(frame / 100, -500, 500), 0))

      state.boxes.x = 200
      state.boxes.y = wave(frame / 100, 0, 500)

      state.boxes.scale = vec(1, 1).scale(wave(frame / 100, 0.5, 1.5)).xy as [number, number]
      state.boxes.rotation = wave(frame / 100, 0, Math.PI * 2)
    },

    paint(painter, { state }) {
      painter.gob(state.parent)
      painter.gob(state.boxes)
    },
  })
