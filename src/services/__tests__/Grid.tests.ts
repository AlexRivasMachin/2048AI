import { GridHandler } from '../Grid.ts';
import { MOVE_OPTIONS } from '../../enums.ts';
import { CellHandler as Cell } from '../Cell';

describe('GridHandler', () => {

    const mockSetState = jest.fn();
    const gridHandler = new GridHandler(mockSetState, mockSetState, mockSetState, mockSetState);
    gridHandler.disableCellGeneration();

  it('should move cells up correctly', () => {

    gridHandler.grid = {
      size: 4,
      cells: [
        [new Cell(0, 0, 2), new Cell(0, 1, 2), new Cell(0, 2, 0), new Cell(0, 3, 0)],
        [new Cell(1, 0, 0), new Cell(1, 1, 2), new Cell(1, 2, 0), new Cell(1, 3, 0)],
        [new Cell(2, 0, 0), new Cell(2, 1, 0), new Cell(2, 2, 0), new Cell(2, 3, 0)],
        [new Cell(3, 0, 0), new Cell(3, 1, 0), new Cell(3, 2, 0), new Cell(3, 3, 0)],
      ],
    };

    gridHandler.makeMove(MOVE_OPTIONS.UP);

    expect(gridHandler.grid.cells[0][0].getValue()).toBe(4);
    expect(gridHandler.grid.cells[1][0].getValue()).toBe(2);
    expect(gridHandler.grid.cells[2][0].getValue()).toBe(0);
    expect(gridHandler.grid.cells[3][0].getValue()).toBe(0);
  });

    it('should move cells down correctly', () => {
        gridHandler.grid = {
            size: 4,
            cells: [
            [new Cell(0, 0, 0), new Cell(0, 1, 0), new Cell(0, 2, 2), new Cell(0, 3, 2)],
            [new Cell(1, 0, 0), new Cell(1, 1, 0), new Cell(1, 2, 0), new Cell(1, 3, 0)],
            [new Cell(2, 0, 0), new Cell(2, 1, 0), new Cell(2, 2, 0), new Cell(2, 3, 0)],
            [new Cell(3, 0, 0), new Cell(3, 1, 0), new Cell(3, 2, 0), new Cell(3, 3, 0)],
            ],
        };

        gridHandler.makeMove(MOVE_OPTIONS.DOWN);

        expect(gridHandler.grid.cells[0][3].getValue()).toBe(4);
        expect(gridHandler.grid.cells[1][3].getValue()).toBe(0);
        expect(gridHandler.grid.cells[2][3].getValue()).toBe(0);
        expect(gridHandler.grid.cells[3][3].getValue()).toBe(0);
    });

    it('should move cells left correctly', () => {
        gridHandler.grid = {
            size: 4,
            cells: [
            [new Cell(0, 0, 2), new Cell(0, 1, 0), new Cell(0, 2, 0), new Cell(0, 3, 0)],
            [new Cell(1, 0, 0), new Cell(1, 1, 0), new Cell(1, 2, 0), new Cell(1, 3, 0)],
            [new Cell(2, 0, 0), new Cell(2, 1, 0), new Cell(2, 2, 0), new Cell(2, 3, 0)],
            [new Cell(3, 0, 2), new Cell(3, 1, 0), new Cell(3, 2, 0), new Cell(3, 3, 0)],
            ],
        };

        gridHandler.makeMove(MOVE_OPTIONS.LEFT);

        expect(gridHandler.grid.cells[0][0].getValue()).toBe(4);
        expect(gridHandler.grid.cells[0][1].getValue()).toBe(0);
        expect(gridHandler.grid.cells[0][2].getValue()).toBe(0);
        expect(gridHandler.grid.cells[0][3].getValue()).toBe(0);
    });

    it('should move cells right correctly', () => {
        gridHandler.grid = {
            size: 4,
            cells: [
            [new Cell(0, 0, 2), new Cell(0, 1, 0), new Cell(0, 2, 0), new Cell(0, 3, 0)],
            [new Cell(1, 0, 0), new Cell(1, 1, 0), new Cell(1, 2, 0), new Cell(1, 3, 0)],
            [new Cell(2, 0, 2), new Cell(2, 1, 0), new Cell(2, 2, 0), new Cell(2, 3, 0)],
            [new Cell(3, 0, 0), new Cell(3, 1, 0), new Cell(3, 2, 0), new Cell(3, 3, 0)],
            ],
        };

        gridHandler.makeMove(MOVE_OPTIONS.RIGHT);

        expect(gridHandler.grid.cells[3][0].getValue()).toBe(4); 
        expect(gridHandler.grid.cells[3][1].getValue()).toBe(0);
        expect(gridHandler.grid.cells[3][2].getValue()).toBe(0); 
        expect(gridHandler.grid.cells[3][3].getValue()).toBe(0); 
    });

    it('cells should push each other left-right', () => {
        gridHandler.grid = {
            size: 4,
            cells: [
            [new Cell(0, 0, 2), new Cell(0, 1, 0), new Cell(0, 2, 0), new Cell(0, 3, 0)],
            [new Cell(1, 0, 2), new Cell(1, 1, 4), new Cell(1, 2, 0), new Cell(1, 3, 0)],
            [new Cell(2, 0, 2), new Cell(2, 1, 0), new Cell(2, 2, 0), new Cell(2, 3, 0)],
            [new Cell(3, 0, 0), new Cell(3, 1, 2), new Cell(3, 2, 0), new Cell(3, 3, 0)],
            ],
        };

        gridHandler.makeMove(MOVE_OPTIONS.RIGHT);

        expect(gridHandler.grid.cells[3][0].getValue()).toBe(4); 
        expect(gridHandler.grid.cells[2][0].getValue()).toBe(2); 
        expect(gridHandler.grid.cells[3][1].getValue()).toBe(2); 
        expect(gridHandler.grid.cells[2][1].getValue()).toBe(4); 
    });
    
    it('cells should push each other right-left', () => {
        gridHandler.grid = {
            size: 4,
            cells: [
            [new Cell(0, 0, 2), new Cell(0, 1, 0), new Cell(0, 2, 0), new Cell(0, 3, 0)],
            [new Cell(1, 0, 2), new Cell(1, 1, 2), new Cell(1, 2, 0), new Cell(1, 3, 0)],
            [new Cell(2, 0, 2), new Cell(2, 1, 0), new Cell(2, 2, 0), new Cell(2, 3, 0)],
            [new Cell(3, 0, 0), new Cell(3, 1, 4), new Cell(3, 2, 0), new Cell(3, 3, 0)],
            ],
        };

        gridHandler.makeMove(MOVE_OPTIONS.LEFT);

        expect(gridHandler.grid.cells[0][0].getValue()).toBe(4); 
        expect(gridHandler.grid.cells[1][0].getValue()).toBe(2); 
        expect(gridHandler.grid.cells[0][1].getValue()).toBe(2); 
        expect(gridHandler.grid.cells[1][1].getValue()).toBe(4); 
    });

    it('cells should push each other top-bottom', () => {
        gridHandler.grid = {
            size: 4,
            cells: [
            [new Cell(0, 0, 2), new Cell(0, 1, 2), new Cell(0, 2, 2), new Cell(0, 3, 0)],
            [new Cell(1, 0, 2), new Cell(1, 1, 4), new Cell(1, 2, 0), new Cell(1, 3, 0)],
            [new Cell(2, 0, 0), new Cell(2, 1, 0), new Cell(2, 2, 0), new Cell(2, 3, 0)],
            [new Cell(3, 0, 0), new Cell(3, 1, 0), new Cell(3, 2, 0), new Cell(3, 3, 0)],
            ],
        };

        gridHandler.makeMove(MOVE_OPTIONS.DOWN);

        expect(gridHandler.grid.cells[0][3].getValue()).toBe(4); 
        expect(gridHandler.grid.cells[0][2].getValue()).toBe(2); 
        expect(gridHandler.grid.cells[1][3].getValue()).toBe(4); 
        expect(gridHandler.grid.cells[1][2].getValue()).toBe(2); 
    });

    it('cells should push each other bottom-top', () => {
        gridHandler.grid = {
            size: 4,
            cells: [
            [new Cell(0, 0, 2), new Cell(0, 1, 2), new Cell(0, 2, 2), new Cell(0, 3, 0)],
            [new Cell(1, 0, 0), new Cell(1, 1, 4), new Cell(1, 2, 0), new Cell(1, 3, 2)],
            [new Cell(2, 0, 0), new Cell(2, 1, 0), new Cell(2, 2, 0), new Cell(2, 3, 0)],
            [new Cell(3, 0, 0), new Cell(3, 1, 0), new Cell(3, 2, 0), new Cell(3, 3, 0)],
            ],
        };

        gridHandler.makeMove(MOVE_OPTIONS.UP);

        expect(gridHandler.grid.cells[0][0].getValue()).toBe(4); 
        expect(gridHandler.grid.cells[0][1].getValue()).toBe(2); 
        expect(gridHandler.grid.cells[1][0].getValue()).toBe(4); 
        expect(gridHandler.grid.cells[1][1].getValue()).toBe(2); 
    });
});