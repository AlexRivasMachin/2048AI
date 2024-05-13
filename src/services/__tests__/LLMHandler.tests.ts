import { LLMHandler } from "../LLMHandler";

describe("LLMHandler", () => {

  const handler = new LLMHandler();

  it("should return up or down", async () => {

    const tablero = [
        [2, 0, 0, 0],
        [2, 4, 0, 0],
        [0, 0, 2, 0],
        [0, 0, 0, 2]
    ];

    const result = await handler.getBestMove(tablero);

    expect([{ move: "Up" }, { move: "Down" }]).toContainEqual(result);
  });

  it("should return left or right", async () => {

    const tablero = [
        [0, 4, 4, 0],
        [2, 2, 2, 2],
        [8, 0, 2, 0],
        [0, 0, 0, 2]
    ];

    const result = await handler.getBestMove(tablero);

    expect([{ move: "Left" }, { move: "Right" }]).toContainEqual(result);
  });
});