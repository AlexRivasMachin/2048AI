import { LLMHandler } from './LLMHandler.ts'

const handler = new LLMHandler();
const tablero = [
    [0, 4, 4, 0],
    [2, 2, 2, 2],
    [8, 0, 8, 0],
    [0, 0, 0, 2]
];
const movimiento = handler.getBestMove(tablero);
console.log(movimiento);