import {  Grid as GridType } from '../types'; // Asegúrate de importar desde la ruta correcta
import {CellHandler as Cell} from './Cell'

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

}
