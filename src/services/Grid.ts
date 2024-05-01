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
    this.assignValueToEmptyCell();
  }

  moveUp(): void {
    this.grid.cells.forEach((row, i) =>{
      row.forEach((cell, j) => {
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
      row.forEach((cell, j) => {
        let offset : number = 1;
        while(this.tryToMove(i, j+offset-1, i, j + offset)){
          offset++;
        }
      });
    });
  }
  moveLeft(): void {
    this.grid.cells.forEach((row, i) =>{
      row.forEach((cell, j) => {
        let offset : number = 1;
        while(this.tryToMove(i-offset+1, j, i-offset, j)){
          offset++;
        }
      });
    });
  }
  moveRight(): void {
    this.grid.cells.forEach((row, i) =>{
      row.forEach((cell, j) => {
        let offset : number = 1;
        while(this.tryToMove(i+offset-1, j, i+offset, j)){
          offset++;
        }
      });
    });
  }

  

  tryToMove(x: number, y: number, x2: number, y2: number): boolean {
    if(this.cellIsEmpty(x, y) || this.cellIsOutOfGrid(x2, y2)) {
      return false;
    }
    if(this.cellIsEmpty(x2, y2)) {
      this.moveCell(x, y, x2, y2);
      return true;
    }
    if(this.cellEqualInValue(x, y, x2, y2)) {
      this.mergeCells(x, y, x2, y2);
      return true;
    }else{
      if(this.trytoPushNeighbours(x, y, x2, y2)){
        this.tryToMove(x, y, x2, y2);
      };
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

  //MIRAR SI HACIA DONDE SE MUEVE, HAY UNA CELDA CON UN VALOR DISTINTO, ENTONCES SE MUEVE A LA ANTERIOR si hay [][2][4][] que se quede [][][2][4]
  cellHasDifferentValue(x: number, y: number, x2: number, y2: number): boolean {
    return this.grid.cells[x][y].getValue() !== this.grid.cells[x2][y2].getValue();
  }



  moveCell(x: number, y: number, x2: number, y2: number): void {
    this.grid.cells[x2][y2].setValue(this.grid.cells[x][y].getValue());
    this.grid.cells[x][y].emptyValue();
  }
  mergeCells(x: number, y: number, x2: number, y2: number): void {
    this.grid.cells[x2][y2].doubleValue();
    this.grid.cells[x][y].emptyValue();
  }

  assignValueToEmptyCell(): void {
    const emptyCells: Cell[] = this.getEmptyCells();
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    emptyCells[randomIndex].initializeValue(this.grid.size);
  }
  // TODO: Implementar el método que comprueba si el juego ha terminado

  // TODO: MIRAR QUE SI NADA SE MUEVE EN UNA DIRECCIÓN NO SE GENERE UNA NUEVA CELDA
}

