export interface The2048 {
    grid:        Grid;
    score:       number;
    over:        boolean;
    won:         boolean;
    keepPlaying: boolean;
}

export interface Grid {
    size:  number;
    cells: Array<Array<Cell | null>>;
}

export interface Cell {
    position: Position;
    value:    number;
}

export interface Position {
    x: number;
    y: number;
}
