import {  Grid as GridType } from '../types'; // Asegúrate de importar desde la ruta correcta
import {CellHandler as Cell} from './Cell'
import { MOVE_OPTIONS, MoveOptionsType } from '../enums.ts';

export class GridHandler {
  grid: GridType;
  //todo: esto ponerlo en un archivo de configuración

  constructor() {
    this.grid = { size: 4, cells: [] };
    this.initializeGrid(this.grid.size);
    this.initializeRandomCells();
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

    this.grid.cells[x][y].initializeValue(this.grid.size);
    this.grid.cells[x2][y2].initializeValue(this.grid.size);
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
  }

  moveUp(): void {
    console.log("moveUp");
    this.grid.cells.forEach((row, i) =>{
      row.forEach((cell, j) => {
        let offset : number = 1;
        while(this.tryToMove(i, j, i, j - offset)){
          offset++;
        }
      });
    });
  }
  moveDown(): void {
    console.log("moveDown");
  }
  moveLeft(): void {
    console.log("moveLeft");
  }
  moveRight(): void {
    console.log("moveRight");
  }

  tryToMove(x: number, y: number, x2: number, y2: number): boolean {
    if(this.grid.cells[x][y].isEmpty()) {
      return false;
    }
    if(x2 < 0 || x2 >= this.grid.size || y2 < 0 || y2 >= this.grid.size) {
      return false;
    }
    if(this.grid.cells[x2][y2].isEmpty()) {
      this.moveCell(x, y, x2, y2);
      return true;
    }
    if(this.grid.cells[x][y].equalsInValue(this.grid.cells[x2][y2])) {
      this.mergeCells(x, y, x2, y2);
      return true;
    }
  }

  moveCell(x: number, y: number, x2: number, y2: number): void {
    this.grid.cells[x2][y2].setValue(this.grid.cells[x][y].getValue());
    this.grid.cells[x][y].emptyValue();
    console.log(`moveCell from ${x},${y} to ${x2},${y2}`);
  }

  mergeCells(x: number, y: number, x2: number, y2: number): void {
    this.grid.cells[x2][y2].doubleValue();
    this.grid.cells[x][y].emptyValue();
  }
}
