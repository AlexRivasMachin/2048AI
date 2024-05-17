import {CellHandler as Cell} from './Cell'
import {  Grid as GridType } from '../types'; // Asegúrate de importar desde la ruta correcta

export class GridHelper {
  grid: GridType;
  hasMoved: boolean = false;

  constructor(grid: GridType
  ) {
    this.grid = grid;
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
    this.hasMoved = true;
  }

  getPossibleMoves(): string[] {
    const directions = ['up', 'down', 'left', 'right'];
    const possibleMoves: string[] = [];

    directions.forEach(direction => {
        let gridCopy = this.cloneGrid(this.grid); // Deep copy of the grid
        this.hasMoved = false;
        switch (direction) {
        case 'up':
            this.moveUp();
            break;
        case 'down':
            this.moveDown();
            break;
        case 'left':
            this.moveLeft();
            break;
        case 'right':
            this.moveRight();
            break;
        }
        // If the grid state has changed, the move is possible
        if (JSON.stringify(this.grid) !== JSON.stringify(gridCopy)) {
            possibleMoves.push(direction);
        }
        this.grid = this.cloneGrid(gridCopy); 
    });

    return possibleMoves;
    }

    cloneGrid(grid : GridType): GridType {
        const size = grid.size;
        const cells: Array<Array<Cell>> = Array.from({ length: size }, (_, i) => 
          Array.from({ length: size }, (_, j) => 
            new Cell(i, j, grid.cells[i][j].getValue())
          )
        );
        return { size, cells };
      }

}

