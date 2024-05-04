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
import Grid from './Grid.tsx';
import type {Game as GameType} from '../types'
import {APP_STATUS, AppStatusType, MoveOptionsType} from '../enums.ts'
import {GameHandler} from '../services/Game.ts';
import { GridHandler } from '../services/Grid.ts';

// Creación del tablero de 2048 (siempre es 16 celdas)
const Board = ({isIA} : {isIA : boolean}) =>{
    const boardRef = useRef(null);

    const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.PLAYING);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [move, setMove] = useState<MoveOptionsType | null>(null);

    const gridHandlerRef = useRef(new GridHandler(setAppStatus, setScore, setBestScore, setMove));

    const Game: GameType = {
        grid: gridHandlerRef.current,
        score: score,
        bestScore: bestScore,
        appStatus: appStatus,
        lastMove: move,
        iaPlayer: isIA
    }

    const gameHandlerRef = useRef(new GameHandler(Game, setAppStatus, setScore, setMove));

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
      
    if (!Game.iaPlayer){
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
            gameHandlerRef.current.onLeftKeyDownHandler(event);
        },
        right: (event: React.KeyboardEventHandler) => {
            gameHandlerRef.current.onRightKeyDownHandler(event);
        },
        up: (event: React.KeyboardEventHandler) => {
            gameHandlerRef.current.onUpKeyDownHandler(event);
        },
        down: (event: React.KeyboardEventHandler) => {
            gameHandlerRef.current.onDownKeyDownHandler(event);
        },
    };

    return (
        <>
            <div className="gameBoard">
                <div 
                    className="tags" 
                >
                    <div className="tag">
                        SCORE {Game.score}
                    </div>
                    <div className="tag" style={isIA ? {display: 'none'} : {}}>
                        BEST {bestScore}
                    </div>
                </div>
                <HotKeys keyMap={keyMap} handlers={handlers}>
                    <div  
                        id='board'
                        className="board"
                        tabIndex={0}
                        ref={boardRef}>
                        <Grid gridHandler={gridHandlerRef.current}/>
                    </div>
                </HotKeys>
                <div className="tag" id='playertag'>
                    {Game.iaPlayer ? 'IA' : 'Player'}
                </div>
            </div>
        </>
    );
}

export default Board;
