import { LLMHandler } from './LLMHandler.ts'

const handler = new LLMHandler();

/*
const tablero = [
    [2, 0, 4, 2],
    [0, 0, 4, 0],
    [0, 2, 0, 4],
    [2, 64,4, 128]
];
const tablero = [
    [0, 4, 4, 0],
    [2, 2, 2, 2],
    [8, 0, 8, 0],
    [64, 8, 4, 2]
];*/
    const tablero = [
        [0, 4, 4, 0],
        [2, 2, 2, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
const movimiento =  await handler.getBestMove(tablero);
console.log(movimiento);
console.log(movimiento.move);