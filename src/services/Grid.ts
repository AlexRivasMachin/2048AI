import {  Grid as GridType } from '../types'; // Asegúrate de importar desde la ruta correcta
import {CellHandler as Cell} from './Cell'
import { MOVE_OPTIONS, APP_STATUS, MoveOptionsType, AppStatusType } from '../enums.ts';

export class GridHandler {
  grid: GridType;
  setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setBestScore: React.Dispatch<React.SetStateAction<number>>;
  setMove: React.Dispatch<React.SetStateAction<MoveOptionsType | null>>;
  currentScore: number;
  cellGenerationEnabled: boolean = true;
  hasMoved: boolean = false;
  //todo: esto ponerlo en un archivo de configuración

  constructor(
    setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    setBestScore: React.Dispatch<React.SetStateAction<number>>,
    setMove: React.Dispatch<React.SetStateAction<MoveOptionsType | null>>,
  ) {
    this.grid = { size: 4, cells: [] };
    this.initializeGrid(this.grid.size);
    this.initializeRandomCells();
    this.setAppStatus = setAppStatus;
    this.setScore = setScore;
    this.setBestScore = setBestScore;
    this.setMove = setMove;
    this.currentScore = 0;
  }

  initializeGrid(size: number): void {
    const cells: Array<Array<Cell>> = Array.from({ length: size }, (_, i) => 
      Array.from({ length: size }, (_, j) => 
        new Cell(i, j, 0)
      )
    );
      this.grid = { size, cells };
  }

  initializeRandomCells(): void {
    const {x, y, x2, y2}: {x: number, y: number, x2: number, y2: number} = this.getRandomPosition();

    this.grid.cells[x][y].initializeValue();
    this.grid.cells[x2][y2].initializeValue();
  }


  getRandomEmptyCellCoords():{x: number, y: number}{
    const emptyCells: Cell[] = this.getEmptyCells(); 

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex].cell.position;
  }

  getEmptyCells(): Cell[] {
    return this.grid.cells.flat().filter(cell => cell.isEmpty());
  }

  getRandomPosition(): {x: number, y: number, x2: number, y2: number} {
    const x: number = this.getRandomPositionValue();
    const y: number = this.getRandomPositionValue();
    let x2: number = this.getRandomPositionValue();
    let y2: number = this.getRandomPositionValue();

    while (x === x2 && y === y2) {
      x2 = this.getRandomPositionValue();
      y2 = this.getRandomPositionValue();
    }

    return { x, y, x2, y2 };
  }

  getRandomPositionValue(): number {
    return Math.floor(Math.random() * this.grid.size);
  }

  makeMove(move: MoveOptionsType): void {
    this.hasMoved = false;
    this.setMove(move);
    switch (move) {
      case MOVE_OPTIONS.UP:
        this.moveUp();
        break;
      case MOVE_OPTIONS.DOWN:
        this.moveDown();
        break;
      case MOVE_OPTIONS.LEFT:
        this.moveLeft();
        break;
      case MOVE_OPTIONS.RIGHT:
        this.moveRight();
        break;
    }
    if(this.hasMoved && this.areThereAvailableMoves() && this.getEmptyCells().length > 0 && this.cellGenerationEnabled){
      this.assignValueToEmptyCell();
    }
    if(!this.areThereAvailableMoves()){
      console.log("No hay movimientos disponibles");
      this.setAppStatus(APP_STATUS.GAME_OVER);
    }
    if(this.hasWon()) this.wonBoard();
  }

  moveUp(): void {
    this.grid.cells.forEach((row, i) =>{
      row.forEach((_, j) => {
        let offset : number = 1;
        //Intenta moverlo hasta que no se pueda mover más, en cada iteración incrementa el offset para moverlo más lejos
        while(this.tryToMove(i, j-offset+1, i, j - offset)){
          offset++;
        }
      });
    });
  }
  moveDown(): void {
    this.grid.cells.forEach((row, i) =>{
      row.forEach((_, j) => {
        let offset : number = 1;
        while(this.tryToMove(i, j+offset-1, i, j + offset)){
          offset++;
        }
      });
    });
  }
  moveLeft(): void {
    this.grid.cells.forEach((row, i) =>{
      row.forEach((_, j) => {
        let offset : number = 1;
        while(this.tryToMove(i-offset+1, j, i-offset, j)){
          offset++;
        }
      });
    });
  }
  moveRight(): void {
    this.grid.cells.forEach((row, i) =>{
      row.forEach((_, j) => {
        let offset : number = 1;
        while(this.tryToMove(i+offset-1, j, i+offset, j)){
          offset++;
        }
      });
    });
  }

  

  tryToMove(x: number, y: number, x2: number, y2: number): undefined | boolean{
    if(this.cellIsEmpty(x, y) || this.cellIsOutOfGrid(x2, y2)) {
      return false;
    }
    if(this.cellIsEmpty(x2, y2)) {
      this.moveCell(x, y, x2, y2);
      return true;
    }
    if(this.trytoPushNeighbours(x, y, x2, y2)){
      return this.tryToMove(x, y, x2, y2);
    }
    if(this.cellEqualInValue(x, y, x2, y2)) {
      this.mergeCells(x, y, x2, y2);
      return true;
    }
  }
  

  trytoPushNeighbours(x: number, y: number, x2: number, y2: number): boolean {
    let moved : boolean = false;
    let offsetX : number = x2 - x;
    let offsetY : number = y2 - y;
    while(this.tryToMove(x2, y2, x2 + offsetX, y2 + offsetY)){
      moved = true;
      offsetX++;
      offsetY++;
    }
    return moved;
  }

  cellIsEmpty(x: number, y: number): boolean {
    return this.grid.cells[x][y].isEmpty();
  }
  cellIsOutOfGrid(x: number, y: number): boolean {
    return x < 0 || x >= this.grid.size || y < 0 || y >= this.grid.size;
  }
  cellEqualInValue(x: number, y: number, x2: number, y2: number): boolean {
    return this.grid.cells[x][y].equalsInValue(this.grid.cells[x2][y2]);
  }

  cellHasDifferentValue(x: number, y: number, x2: number, y2: number): boolean {
    return this.grid.cells[x][y].getValue() !== this.grid.cells[x2][y2].getValue();
  }

  moveCell(x: number, y: number, x2: number, y2: number): void {
    this.grid.cells[x2][y2].setValue(this.grid.cells[x][y].getValue());
    this.grid.cells[x][y].emptyValue();
    this.hasMoved = true;
  }
  mergeCells(x: number, y: number, x2: number, y2: number): void {
    this.grid.cells[x2][y2].doubleValue();
    this.grid.cells[x][y].emptyValue();
    this.currentScore += this.grid.cells[x2][y2].getValue();
    this.setScore(this.currentScore);
    this.hasMoved = true;
  }

  assignValueToEmptyCell(): void {
    const emptyCells: Cell[] = this.getEmptyCells();
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    emptyCells[randomIndex].initializeValue();
  }

  areThereAvailableMoves(): boolean {
    for (let i = 0; i < this.grid.size; i++) {
      for (let j = 0; j < this.grid.size; j++) {
        if (this.cellIsEmpty(i, j)) {
          return true;
        }
        if (i < this.grid.size - 1 && this.cellEqualInValue(i, j, i + 1, j)) {
          return true;
        }
        if (j < this.grid.size - 1 && this.cellEqualInValue(i, j, i, j + 1)) {
          return true;
        }
      }
    }
    return false;
  }

  hasWon(): boolean {
    for (let i = 0; i < this.grid.size; i++) {
      for (let j = 0; j < this.grid.size; j++) {
        if (this.grid.cells[i][j].getValue() === 2048) {
          console.log("Has ganado");
          this.setBestScore(this.currentScore)
          this.setAppStatus(APP_STATUS.GAME_WON);
          return true;
        }
      }
    }
    return false;
  }

  wonBoard() {
    this.grid.cells.forEach(row => {
      row.forEach(cell => {
        cell.setValue(777);
      });
    });
  }

  disableCellGeneration() {
    this.cellGenerationEnabled = false;
  }

  
}

