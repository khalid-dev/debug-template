import { Game, type TextOpts, type RectOpts, Gob } from "@vaguevoid/sdk"

type Text = Partial<TextOpts> & { text: string }
type Rect = Partial<RectOpts>

const state = {
  rects: [...Array(2000)].map((_, i) => ({
    x: 10 * i,
    y: 10 * i,
    anchor: "center",
    color: [0.5, 0.5, 0.5, 1],
  })) as Rect[],

  texts: [...Array(2000)].map((_, i) => ({
    text: `text-${i}`,
    x: 400 + 10 * i,
    y: 10 * i,
    anchor: "center",
    align: "center",
    color: [0.5, 0.5, 0.5, 1],
  })) as Text[],

  gob: createGiantGob(),
}

export default () =>
  new Game(state, {
    paint(r) {
      for (const rect of state.rects) {
        r.rect(rect)
      }

      for (const text of state.texts) {
        r.text(text.text, text)
      }
      r.gob(state.gob)
    },
  })

function createGiantGob(): Gob {
  const gob = new Gob({
    id: "screen",
    x: 200,
    y: 0,
    width: 100,
    color: [0.1, 0.1, 0.1, 1],
  })

  for (let i = 0; i < 1000; i++) {
    gob.addKid({
      id: `kid-${i}`,
      x: 10 * i,
      y: 10 * i,
      width: 10,
      color: [0.5, 0.5, 0.5, 1],
    })
  }

  return gob
}
