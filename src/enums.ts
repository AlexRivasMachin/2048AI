const APP_STATUS = {
  PLAYING: "playing",
  GAME_OVER: "game-over",
  GAME_WON: "game-won",
  WAITING: "Waiting",
} as const;

export type AppStatus = (typeof APP_STATUS)[keyof typeof APP_STATUS];

const MOVE_OPTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
} as const;

export type MoveOptions = (typeof MOVE_OPTIONS)[keyof typeof MOVE_OPTIONS];
