import { type Game } from "@vaguevoid/sdk";
import { mount } from "@vaguevoid/sdk/browser";

main();

async function main() {
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Canvas with id 'gameCanvas' not found.");
  }

  const params = new URLSearchParams(location.search);
  const example = params.get("example");
  const compare = params.get("compare");
  if (example) {
    const module = await import(`../examples/${example}.ts`);
    if (!module) {
      throw new Error(`Example not found: ${example}`);
    }

    const game = module.default() as Game<unknown>;
    const unmount = await mount(game, canvas, { paintBackend: "pixi" });

    if (compare) {
      const game2 = module.default() as Game<unknown>;
      const canvas2 = document.createElement("canvas");
      canvas.style.width = "40vw";
      canvas.style.aspectRatio = "16/9";
      canvas2.style.width = "40vw";
      canvas2.style.aspectRatio = "16/9";
      document.body.appendChild(canvas2);
      await mount(game2, canvas2, { paintBackend: "webgpu" });
    }

    game.beforeFrame.connect(({ frame }) => {
      window.dispatchEvent(new CustomEvent(`void:frame:${Number(frame)}`));
    });

    game.afterFrame.connect(() => {
      if (document.body.dataset.freeze == "true") {
        game.pause();
        unmount();
      }
    });
  } else {
    const exampleImports = await import.meta.glob(["../examples/*.ts"]);
    const exampleNames = Object.keys(exampleImports).map((path) =>
      path.split("/").pop()?.replace(".ts", ""),
    );
    window.document.body.innerHTML = `
      <h1>Examples</h1>
      <ul>
      ${exampleNames.map((example) => `<li><a href="?example=${example}">${example}</a></li>`).join("")}
      </ul>
    `;
    return;
  }
}
