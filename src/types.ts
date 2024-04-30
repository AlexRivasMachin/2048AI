import { AppStatusType, MoveOptionsType } from "./enums";

export interface Game {
  grid: Grid;
  score: number;
  appStatus: AppStatusType;
  lastMove: MoveOptionsType | null;
  iaPlayer: boolean;
}

export interface Grid {
  size: number;
  cells: Array<Array<Cell>>;
  //MATRIZ DE 4X4
}

export interface Cell {
  position: Position;
  value: number;
}

export interface Position {
  x: number;
  y: number;
}
