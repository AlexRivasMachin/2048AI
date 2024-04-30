export interface Game {
    grid:        Grid;
    score:       number;
    over:        boolean;
    won:         boolean;
    waiting:     boolean;
    keepPlaying: boolean;
    iaPlayer:   boolean;
    //CAMBIAR ESTO
}

const APP_STATUS = {
    PLAYING: 'playing',
    GAME_OVER: 'game-over',
    GAME_WON: 'game-won',
    WAITING : 'Waiting'
  } as const;

export type AppStatus = typeof APP_STATUS[keyof typeof APP_STATUS];

export interface Grid {
    size:  number;
    cells: Array<Array<Cell>>;
    //MATRIZ DE 4X4    
}

export interface Cell {
    position: Position;
    value:    number;
}

export interface Position {
    x: number;
    y: number;
}
