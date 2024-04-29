/**
 * 2048 JUEGO
 * TENEMOS UN BOARD QUE TIENE 16 CELDAS 
 * CADA CELDA DE NO  TIENE VALOR
 * POR TANTO CADA CELDA TENEMOS UN VALOR, QUE PUEDE SER 0 O UN VALOR QUE ES UNA POTENCIA DE 2
 * PARA SABER DONDE ESTA CADA CELDA, SE USARA UNA MATRIZ DE 4X4, Y CADA CELDA TIENE FILA Y COLUMNA
 * 
 */
import React, { useRef, useEffect } from 'react';
import { HotKeys } from 'react-hotkeys';
import '../Styles/Board.css'
import Cell from './Cell.tsx';
import type {Cell as CellType, Position} from '../types'
import {onLeftKeyDownHandeler, onRighttKeyDownHandeler, onUpKeyDownHandeler, onDownKeyDownHandeler} from '../services/Game.ts';

// Creación del tablero de 2048 (siempre es 16 celdas)
function Board() {
    const boardRef = useRef(null);

    // Crear un array de 16 posiciones para representar las celdas
    const cells: CellType[] = Array.from({ length: 16 }, (_, index): Cell => {
        const position: Position = { x: index % 4, y: Math.floor(index / 4) };
        return {
            position: position,
            value: Math.floor(Math.random() * 100)
        };
    });

    useEffect(() => {
        // Board is initially focused
        if (boardRef.current){
            boardRef.current.focus();
        }
    }, []); // Empty dependency array means this effect runs once after the first render

    const handleRootClick = () => {
        if (boardRef.current){
            boardRef.current.focus();
        }
    };

    function setRootOnClickListener() {
        document.getElementById('root')!.addEventListener('click', () => {
            handleRootClick();
            console.log('root clicked');
        });
      }
      
    setRootOnClickListener();

    const keyMap = {
        left: 'left',
        right: 'right',
        up: 'up',
        down: 'down',
      };
      
      const handlers = {
        left: (event: React.KeyboardEventHandler) => {
            onLeftKeyDownHandeler(event);
        },
        right: (event: React.KeyboardEventHandler) => {
            onRighttKeyDownHandeler(event);
        },
        up: (event: React.KeyboardEventHandler) => {
            onUpKeyDownHandeler(event);
        },
        down: (event: React.KeyboardEventHandler) => {
            onDownKeyDownHandeler(event);
        },
      };

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
            <HotKeys keyMap={keyMap} handlers={handlers}>
                <div  
                    id='board'
                    className="board"
                    tabIndex={0}
                    ref={boardRef}>
                    {cells.map((cell: CellType, index: number) => {
                            return <Cell key={index} {...cell} />;
                    })}
                </div>
            </HotKeys>
            <div className="tag">
                PLAYER
            </div>
        </>
    );
}

export default Board;
