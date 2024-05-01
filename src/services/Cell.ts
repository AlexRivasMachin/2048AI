import { Cell as CellType } from '../types';

export class CellHandler{

    initialNumberTwoProbability : Number = 0.75;
    cell: CellType;

    constructor(x : number, y : number, value : number){
        this.cell = {position: {x, y}, value};
    }

    initializeValue(size: number): void {
        this.cell.value = this.positionIsTwo() ? 2 : 4;
    }

    positionIsTwo(): boolean {
        return Math.random() < this.initialNumberTwoProbability.valueOf();
    }

}