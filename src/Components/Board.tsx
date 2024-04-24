/**
 * 2048 JUEGO
 * TENEMOS UN BOARD QUE TIENE 16 CELDAS 
 * CADA CELDA DE NO  TIENE VALOR
 * POR TANTO CADA CELDA TENEMOS UN VALOR, QUE PUEDE SER 0 O UN VALOR QUE ES UNA POTENCIA DE 2
 * PARA SABER DONDE ESTA CADA CELDA, SE USARA UNA MATRIZ DE 4X4, Y CADA CELDA TIENE FILA Y COLUMNA
 * 
 */

import '.././Styles/Board.css'
import Cell from './Cell.tsx';

// Creación del tablero de 2048 (siempre es 16 celdas)
function Board() {
    // Crear un array de 16 posiciones para representar las celdas
    const cells = Array.from({ length: 16 }, (_, index) => (
        <Cell key={index} />
    ));

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
                {cells}
            </div>
            <div className="tag">
                PLAYER
            </div>
            </>
    );
}

export default Board;
