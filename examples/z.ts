import { BLUE, Game, RED } from "@vaguevoid/sdk"

export default () =>
  new Game(
    {},
    {
      paint(painter) {
        painter.rect({ x: 0, y: 0, z: 1, width: 100, height: 100, color: RED })
        painter.rect({ x: 50, y: 50, width: 100, height: 100, color: BLUE })
      },
    },
  )
