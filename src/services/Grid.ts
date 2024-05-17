import {  Grid as GridType } from '../types'; // Asegúrate de importar desde la ruta correcta
import {CellHandler as Cell} from './Cell'
import { MOVE_OPTIONS, APP_STATUS, MoveOptionsType, AppStatusType } from '../enums.ts';
import { API_HOST } from '../config.ts'
import { GridHelper } from './GridHelper.ts';

export class GridHandler {
  grid: GridType;
  setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setBestScore: React.Dispatch<React.SetStateAction<number>>;
  setMove: React.Dispatch<React.SetStateAction<MoveOptionsType | null>>;
  setForcedUpdate: React.Dispatch<React.SetStateAction<number>>;
  lastMove: MoveOptionsType | null;
  currentScore: number;
  cellGenerationEnabled: boolean = true;
  hasMoved: boolean = false;
  bestScore: number = 0;
  isAI: boolean;
  //todo: esto ponerlo en un archivo de configuración

  constructor(
    setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    setBestScore: React.Dispatch<React.SetStateAction<number>>,
    setMove: React.Dispatch<React.SetStateAction<MoveOptionsType | null>>,
    setForcedUpdate: React.Dispatch<React.SetStateAction<number>>,
    bestScore: number,
    isAI: boolean
  ) {
    this.grid = { size: 4, cells: [] };
    this.initializeGrid(this.grid.size);
    this.initializeRandomCells();
    this.setAppStatus = setAppStatus;
    this.setScore = setScore;
    this.setBestScore = setBestScore;
    this.setMove = setMove;
    this.setForcedUpdate = setForcedUpdate;
    this.lastMove = null;
    this.currentScore = 0;
    this.bestScore = bestScore;
    this.isAI = isAI;
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
      this.changeUseEffectMove(move);
    }
    if(!this.areThereAvailableMoves()){
      console.log("No hay movimientos disponibles");
      if(this.currentScore > this.bestScore){
        this.setBestScore(this.currentScore);
      }
      this.setAppStatus(APP_STATUS.GAME_OVER);
    }
    if(this.hasWon()) this.wonBoard();
  }

  changeUseEffectMove(move: MoveOptionsType): void {
    if(move == this.lastMove && !this.isAI){
      this.setForcedUpdate(prev => prev + 1);
    }else{
      this.setMove(move);
      this.lastMove = move;
    }
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

  transposeGrid(grid: Cell[][]): Cell[][] {
    return grid[0].map((_, i) => grid.map(row => row[i]));
  }
  stringifyTablero(tablero: number[][]) {
    return tablero.map(fila => fila.join(' ')).join('\n');
  }

  /**
   * 
   * @returns Promise<MoveOptionsType | null>, MoveOptionsType is the move to be made by the AI, null if there was an error
   */
  public async requestMoveFromLLM(modelName: string): Promise<MoveOptionsType | null> {
    let result: MoveOptionsType | null = null;

    // Transpose the grid to match the format expected by the LLM
    const transposedGrid = this.transposeGrid(this.grid.cells);
    const tableContext = this.stringifyTablero(transposedGrid.map(row => row.map(cell => cell.getValue())));
    const possibleMoves = this.getPossibleMoves();


    await fetch(`http://${API_HOST}/api/llm/call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        input: tableContext,
        moves: possibleMoves,
        config: {
          modelName: modelName,
        }
      })
    })
      .then(response => response.json())
      .then((data) => {
        const moveKey = (data.move as string).toUpperCase() as keyof typeof MOVE_OPTIONS;
        console.log('Success:', MOVE_OPTIONS[moveKey]);
        result = MOVE_OPTIONS[moveKey];
      })
      .catch(error => {
        console.error('Error:', error);
      });


      this.makeMove(result);
      //por si la IA devuelve un movimiento no válido que se repita hasta que sea válido
      while(!this.hasMoved){
       return this.requestMoveFromLLM();
      }
      return result;
  }

  getPossibleMoves(): string[] {
    let gridCopy: GridType = this.cloneGrid();
    let gridHelper = new GridHelper(gridCopy);
    let possibleMoves = gridHelper.getPossibleMoves();
    return possibleMoves;
  }

  cloneGrid(): GridType {
    const size = this.grid.size;
    const cells: Array<Array<Cell>> = Array.from({ length: this.grid.size }, (_, i) => 
      Array.from({ length: this.grid.size }, (_, j) => 
        new Cell(i, j, this.grid.cells[i][j].getValue())
      )
    );
    return { size, cells };
  }
}

