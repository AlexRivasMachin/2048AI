import { Cell as CellType, Grid as GridType } from '../types'; // Asegúrate de importar desde la ruta correcta

export class GridHandler {
  grid: GridType;
  //todo: esto ponerlo en un archivo de configuración
  initialNumberTwoProbability : Number = 0.75;

  constructor(grid : GridType) {
    this.grid = grid;
    this.grid.size = 4;
    this.initializeGrid(this.grid.size);
    this.initializeRandomCells();
  }

  initializeGrid(size: number): void {
    const cells: Array<Array<CellType>> = Array.from({ length: size }, (_, i) => 
      Array.from({ length: size }, (_, j) => 
        //todo: aquí debería ser el constructor si se crea
        ({ position: { x: i, y: j }, value: 0 })
      )
    );
      this.grid = { size, cells };
  }

  initializeRandomCells(): void {
    const {x, y, x2, y2}: {x: number, y: number, x2: number, y2: number} = this.getRandomPosition();
    this.grid.cells[x][y].value = this.positionIsTwo() ? 2 : 4; 
    this.grid.cells[x2][y2].value = this.positionIsTwo() ? 2 : 4;
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

  positionIsTwo(): boolean {
    return Math.random() < this.initialNumberTwoProbability.valueOf();
  }
}
