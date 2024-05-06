import {
  APP_STATUS,
  MOVE_OPTIONS,
  AppStatusType,
  MoveOptionsType,
} from "../enums.ts";
import type { Game as GameType } from "../types";

import React from "react";

export class GameHandler {
  game: GameType;
  setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setMove: React.Dispatch<React.SetStateAction<MoveOptionsType | null>>;

  constructor(
    game: GameType,
    setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    setMove: React.Dispatch<React.SetStateAction<MoveOptionsType | null>>
  ) {
    this.game = game;
    this.setAppStatus = setAppStatus;
    this.setScore = setScore;
    this.setMove = setMove;
  }

  onLeftKeyDownHandler(_e: KeyboardEvent) {
    this.handleMove(MOVE_OPTIONS.LEFT);
  }
  onRightKeyDownHandler(_e: KeyboardEvent) {
    this.handleMove(MOVE_OPTIONS.RIGHT);
  }
  onUpKeyDownHandler(_e: KeyboardEvent) {
    this.handleMove(MOVE_OPTIONS.UP);
  }
  onDownKeyDownHandler(_e: KeyboardEvent) {
    this.handleMove(MOVE_OPTIONS.DOWN);
  }

  isValidMove(move: MoveOptionsType): boolean {
    if (this.game.appStatus !== APP_STATUS.PLAYING) {
      return false;
    }

    if (this.game.lastMove === move) {
      // no se puede hacer el mismo movimiento dos veces seguidas
      return false;
    }

    return true;
  }

  handleMove(move: MoveOptionsType) {
    const valid = this.isValidMove(move);
    if (valid) {
      //this.game.lastMove = move;
      //this.setMove(this.game.lastMove);
      this.game.score += 1;
      //this.setScore(this.game.score);
      //console.log("score: " + this.game.score);
      this.game.grid.makeMove(move);
    }
  }
}
