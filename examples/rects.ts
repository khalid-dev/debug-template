import { BLUE, GRAY, Game, RED, Rect, WHITE, LIME, vec, wave } from "@vaguevoid/sdk"

export const state = {
  bg: new Rect({
    width: 100,
    color: GRAY,
  }),

  x: new Rect({
    width: 50,
    color: RED,
  }),

  title: new Rect({
    width: 0,
    color: WHITE,
  }),

  startButton: new Rect({
    width: 300,
    height: 100,
    color: BLUE,
  }),

  leftHp: new Rect({
    width: 0,
    height: 50,
    color: LIME,
  }),

  rightHp: new Rect({
    width: 0,
    height: 50,
    color: LIME,
  }),
}

export default () =>
  new Game(state, {
    update(state, { screen: { width, height }, ...context }) {
      const screenCenter = vec(width / 2, height / 2)

      state.bg.width = width * 0.9
      state.bg.height = height * 0.9
      state.bg.center = screenCenter

      state.x.right = state.bg.right - 50
      state.x.top = state.bg.top + 50

      state.leftHp.left = state.bg.left + 50
      state.leftHp.top = state.bg.top + 100
      state.leftHp.width = wave(context.frame / 100, 0, 300)

      state.rightHp.width = 300
      state.rightHp.right = state.bg.right - 50
      state.rightHp.top = state.bg.top + 100
      state.rightHp.width = wave(context.frame / 100, 0, 300)

      state.title.width = state.bg.width * 0.8
      state.title.height = state.bg.height * 0.2
      state.title.centerX = state.bg.centerX
      state.title.top = state.bg.top + 200

      state.startButton.centerX = state.bg.centerX
      state.startButton.bottom = state.bg.bottom - 125

      // rect classes are serializable and revivable
      const json = JSON.stringify(state)
      context.state = JSON.parse(json, Rect.revive)
    },

    paint(painter, { state }) {
      // this renders a mockup of a modal title screen
      painter.rect(state.bg)
      painter.rect(state.x)
      painter.rect(state.title)
      painter.rect(state.startButton)

      painter.rect(state.leftHp)
      painter.rect(state.rightHp)
    },
  })
