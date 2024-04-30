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
