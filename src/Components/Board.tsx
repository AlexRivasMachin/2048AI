/**
 * 2048 JUEGO
 * TENEMOS UN BOARD QUE TIENE 16 CELDAS 
 * CADA CELDA DE NO  TIENE VALOR
 * POR TANTO CADA CELDA TENEMOS UN VALOR, QUE PUEDE SER 0 O UN VALOR QUE ES UNA POTENCIA DE 2
 * PARA SABER DONDE ESTA CADA CELDA, SE USARA UNA MATRIZ DE 4X4, Y CADA CELDA TIENE FILA Y COLUMNA
 * 
 */

import '../Styles/Board.css'
import Cell from './Cell.tsx';
import type {Cell as CellType, Position} from '../types'

// Creación del tablero de 2048 (siempre es 16 celdas)
function Board() {
    // Crear un array de 16 posiciones para representar las celdas
    const cells: CellType[] = Array.from({ length: 16 }, (_, index): Cell => {
        const position: Position = { x: index % 4, y: Math.floor(index / 4) };
        return {
            position: position,
            value: Math.floor(Math.random() * 100)
        };
    });

    return (
        <>
            <div className="tags">
                <div className="tag">
                    SCORE
                </div>
                <div className="tag">
                    BEST
                </div>
            </div>
            <div className="board">
            {cells.map((cell: CellType, index: number) => {
                    return <Cell key={index} {...cell} />;
            })}
            </div>
            <div className="tag">
                PLAYER
            </div>
            </>
    );
}

export default Board;
