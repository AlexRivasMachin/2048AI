import { action, makeObservable, observable } from 'mobx';
import { Cell as CellType } from '../types';

export class CellHandler{
    cell: CellType;

    initialNumberTwoProbability : Number = 0.75;

    constructor(x : number, y : number, value : number){
        makeObservable(this, {
            cell: observable,
            setValue: action
        });
        this.cell = {position: {x, y}, value};
    }

    initializeValue(size: number): void {
        this.cell.value = this.positionIsTwo() ? 512 : 1024;

    }

    positionIsTwo(): boolean {
        return Math.random() < this.initialNumberTwoProbability.valueOf();
    }

    isEmpty(): boolean {
        return this.cell.value === 0;
    }

    equalsInValue(cell: CellHandler): boolean {
        return this.cell.value === cell.cell.value;
    }

    setValue(value: number): void {
        this.cell = {position: this.cell.position, value};
        console.log(`Position: ${this.cell.position.x}, ${this.cell.position.y} Value: ${this.cell.value}`);
    }
    emptyValue(): void {
        this.setValue(0);
    }
    doubleValue(): void {
        this.setValue(this.cell.value * 2);
    }
    getValue(): number {
        return this.cell.value;
    }

}