import { Game, type TextOpts, type Transform, wave, MAGENTA, YELLOW, BLACK, WHITE, CYAN } from "@vaguevoid/sdk"

export default () =>
  new Game(
    {},
    {
      start() {},

      paint(painter, { state, frame }) {
        const testFrame = frame
        painter.text("Goodnight Moon!", { x: 100, y: 100, color: WHITE, fontSize: 20 })
        painter.text("Goodnight Moon!", { x: 100, y: 125, color: MAGENTA, fontSize: 20, fontStyle: "italic" })
        painter.text("Goodnight Moon!", { x: 100, y: 150, color: YELLOW, fontSize: 20, fontWeight: "bold" })
        painter.text("Goodnight Moon!", {
          x: 100,
          y: 175,
          color: CYAN,
          fontSize: 30,
          fontFamily: "Brush Script MT",
        })

        const quote = `“When I use a word,” Humpty Dumpty said, in rather a scornful tone, “it means just what I choose it to mean – neither more nor less.”\n“The question is,” said Alice, “whether you can make words mean so many different things.”\n“The question is,” said Humpty Dumpty, “which is to be master – that’s all.”`
        const textOpts: Partial<TextOpts> = {
          x: 310,
          y: 110,
          color: BLACK,
          fontSize: 30,
          fontFamily: "Andalé Mono",
          wordWrapWidth: 380,
        }
        const { width, height } = painter.measureText(quote, textOpts)
        painter.rect({ x: 300, y: 100, width: width + 20, height: height + 20, color: WHITE })
        painter.text(quote, textOpts)

        const alignmentText = "in this house\nwe believe\ntext should be aligned"
        painter.text(alignmentText, { x: 750, y: 100, color: [0.5, 1, 0.5, 1], fontSize: 30, align: "left" })
        painter.text(alignmentText, { x: 750, y: 300, color: [0.5, 1, 0.5, 1], fontSize: 30, align: "center" })
        painter.text(alignmentText, { x: 750, y: 500, color: [0.5, 1, 0.5, 1], fontSize: 30, align: "right" })

        const sharedOpts: Partial<Transform> = {
          x: 1100,
          y: 100,
          anchor: "topLeft",
          rotation: wave(testFrame / 100, Math.PI / 8, -Math.PI),
          scale: wave(testFrame / 50, 0.25, 1),
        }

        const spinText = `You spin me right 'round\nbaby, right 'round\nLike a record, baby\nright 'round, 'round, 'round`
        painter.text(spinText, { ...sharedOpts, color: [1, 1, 0.5, 1], fontSize: 30 })

        painter.text("leading and\nletter spacing\nalso works", {
          x: 100,
          y: 850,
          color: [0.25, 0.5, 1, 1],
          leading: wave(testFrame / 60, 0, 10),
          letterSpacing: wave(testFrame / 100, 0, 20),
        })

        painter.text("alignment test", { x: 100, y: 440, color: WHITE, fontSize: 15 })
        const rotation = testFrame / 100
        painter.text("1️⃣", { rotation, x: 130, y: 500, color: YELLOW, fontSize: 30, anchor: "topLeft" })
        painter.text("2️⃣", { rotation, x: 130, y: 500, color: YELLOW, fontSize: 30, anchor: "topRight" })
        painter.text("3️⃣", { rotation, x: 130, y: 500, color: YELLOW, fontSize: 30, anchor: "bottomLeft" })
        painter.text("4️⃣", { rotation, x: 130, y: 500, color: YELLOW, fontSize: 30, anchor: "bottomRight" })
        painter.text("⏺️", { rotation, x: 130, y: 500, color: YELLOW, fontSize: 30, anchor: "center" })

        painter.text(`frame ${testFrame}`, {
          x: painter.width,
          y: painter.height,
          color: YELLOW,
          fontSize: 30,
          anchor: "bottomRight",
        })
      },
    },
  )
