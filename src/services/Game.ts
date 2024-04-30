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

  onLeftKeyDownHandler(e: React.KeyboardEventHandler) {
    this.handleMove(MOVE_OPTIONS.LEFT);
    console.log(e);
  }
  onRightKeyDownHandler(e: React.KeyboardEventHandler) {
    this.handleMove(MOVE_OPTIONS.RIGHT);
    console.log(e);
  }
  onUpKeyDownHandler(e: React.KeyboardEventHandler) {
    this.handleMove(MOVE_OPTIONS.UP);
    console.log(e);
  }
  onDownKeyDownHandler(e: React.KeyboardEventHandler) {
    this.handleMove(MOVE_OPTIONS.DOWN);
    console.log(e);
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
      this.game.lastMove = move;
      this.setMove(this.game.lastMove);
      this.game.score += 1;
      this.setScore(this.game.score);
      console.log("score: " + this.game.score);
    }
  }
}
