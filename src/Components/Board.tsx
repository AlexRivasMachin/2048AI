/**
 * 2048 JUEGO
 * TENEMOS UN BOARD QUE TIENE 16 CELDAS 
 * CADA CELDA DE NO  TIENE VALOR
 * POR TANTO CADA CELDA TENEMOS UN VALOR, QUE PUEDE SER 0 O UN VALOR QUE ES UNA POTENCIA DE 2
 * PARA SABER DONDE ESTA CADA CELDA, SE USARA UNA MATRIZ DE 4X4, Y CADA CELDA TIENE FILA Y COLUMNA
 * 
 */
import React, { useRef, useEffect, useState } from 'react';
import { HotKeys } from 'react-hotkeys';
import '../Styles/Board.css'
import Cell from './Cell.tsx';
import type {Cell as CellType, Game as GameType} from '../types'
import {APP_STATUS, AppStatusType, MoveOptionsType} from '../enums.ts'
import {GameHandler} from '../services/Game.ts';

// Creación del tablero de 2048 (siempre es 16 celdas)
const Board = ({isIA} : {isIA : boolean}) =>{
    const boardRef = useRef(null);

    const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.PLAYING);
    const [score, setScore] = useState(0);
    const [move, setMove] = useState<MoveOptionsType | null>(null);

    const Game: GameType = {
        grid: {
            size: 16,
            cells: Array.from({ length: 4 }, (_, index_y) => Array.from({ length: 4 }, (_, index_x) => ({ position: { x: index_y, y: index_x }, value: 0 })))
        },
        score: score,
        appStatus: appStatus,
        lastMove: move,
        iaPlayer: isIA
    }

    const GameHandeler = new GameHandler(Game, setAppStatus, setScore, setMove);

    useEffect(() => {
        // Board is initially focused
        if (boardRef.current){
            (boardRef.current as HTMLElement).focus();
        }
    }, []); // Empty dependency array means this effect runs once after the first render

    const handleRootClick = () => {
        if (boardRef.current){
            (boardRef.current as HTMLElement).focus();
        }
    };

    function setRootOnClickListener() {
        document.getElementById('root')!.addEventListener('click', () => {
            handleRootClick();
            console.log('root clicked');
        });
      }
      
    if (Game.iaPlayer){
        setRootOnClickListener();
    }

    const keyMap = {
        left: ['left', 'a'],
        right: ['right', 'd'],
        up: ['up', 'w'],
        down: ['down', 's'],
      };
      
    const handlers = {
        left: (event: React.KeyboardEventHandler) => {
            GameHandeler.onLeftKeyDownHandler(event);
        },
        right: (event: React.KeyboardEventHandler) => {
            GameHandeler.onRightKeyDownHandler(event);
        },
        up: (event: React.KeyboardEventHandler) => {
            GameHandeler.onUpKeyDownHandler(event);
        },
        down: (event: React.KeyboardEventHandler) => {
            GameHandeler.onDownKeyDownHandler(event);
        },
    };

    return (
        <>
            <div className="tags">
                <div className="tag">
                    SCORE {Game.score}
                </div>
                <div className="tag">
                    BEST 0
                </div>
            </div>
            <HotKeys keyMap={keyMap} handlers={handlers}>
                <div  
                    id='board'
                    className="board"
                    tabIndex={0}
                    ref={boardRef}>
                    {Game.grid.cells.flat().map((cell: CellType, index: number) => {
                            return <Cell key={index} {...cell} />;
                    })}
                </div>
            </HotKeys>
            <div className="tag">
                {Game.iaPlayer ? 'IA' : 'Player'}
            </div>
        </>
    );
}

export default Board;
