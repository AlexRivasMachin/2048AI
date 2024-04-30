export const APP_STATUS = {
  PLAYING: "playing",
  GAME_OVER: "game-over",
  GAME_WON: "game-won",
  WAITING: "Waiting",
} as const;

export type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

export const MOVE_OPTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
} as const;

export type MoveOptionsType = (typeof MOVE_OPTIONS)[keyof typeof MOVE_OPTIONS];