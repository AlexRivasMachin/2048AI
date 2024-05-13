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

  it("should return up", async () => {

    const tablero = [
        [128, 4, 8, 2],
        [0, 0, 4, ],
        [128, 0, 0, 0],
        [4, 0, 0, 0]
    ];

    const result = await handler.getBestMove(tablero);

    expect([{ move: "Up" }]).toContainEqual(result);
  });

  it("should return down", async () => {

    const tablero = [
        [4, 4, 8, 2],
        [128, 0, 4, ],
        [0, 0, 0, 0],
        [128, 64, 2, 0]
    ];

    const result = await handler.getBestMove(tablero);

    expect([{ move: "Down" }]).toContainEqual(result);
  });

  it("should return Left", async () => {

    const tablero = [
        [4, 0, 8, 2],
        [0, 0, 4, ],
        [0, 0, 2, 0],
        [128, 128, 2, 4]
    ];

    const result = await handler.getBestMove(tablero);

    expect([{ move: "Left" }]).toContainEqual(result);
  });

  it("should return Right", async () => {

    const tablero = [
        [4, 0, 0, 2],
        [4, 0, 0, 2],
        [0, 0, 2, 2],
        [2, 64, 128, 128]
    ];

    const result = await handler.getBestMove(tablero);

    expect([{ move: "Right" }]).toContainEqual(result);
  });
});