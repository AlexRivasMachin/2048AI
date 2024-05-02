import { AppStatusType, MoveOptionsType } from "./enums";
import { CellHandler } from "./services/Cell";
import { GridHandler } from "./services/Grid";

export interface Game {
  grid: GridHandler;
  score: number;
  bestScore: number;
  appStatus: AppStatusType;
  lastMove: MoveOptionsType | null;
  iaPlayer: boolean;
}

export interface Grid {
  size: number;
  cells: Array<Array<CellHandler>>;
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


