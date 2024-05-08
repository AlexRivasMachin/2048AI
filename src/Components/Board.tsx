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
import '../Styles/Dialog.css'
import Grid from './Grid.tsx';
import type {Game as GameType} from '../types'
import {APP_STATUS, AppStatusType, MoveOptionsType} from '../enums.ts'
import {GameHandler} from '../services/Game.ts';
import { GridHandler } from '../services/Grid.ts';

const Board = (
    {isIA, lastPlayerMove, bestScore, setLastPlayerMove, setGameOver, setBestScore} : 
    {isIA : boolean, 
    lastPlayerMove?: MoveOptionsType | null,
    bestScore: number,
    setBestScore: React.Dispatch<React.SetStateAction<number>>,
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
    setLastPlayerMove?: React.Dispatch<React.SetStateAction<MoveOptionsType | null>>}
) =>{
    const boardRef = useRef(null);
    const loseDialogRef = useRef<HTMLDivElement | null>(null);

    const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.PLAYING);
    const [score, setScore] = useState(0);
    const [move, setMove] = useState<MoveOptionsType | null>(null);
    const [gridHandler, setGridHandler] = useState<GridHandler>(new GridHandler(setAppStatus, setScore, setBestScore, setMove, bestScore));

    const Game: GameType = {
        grid: gridHandler,
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

    const restartGame = () => {
        if (score > bestScore){
            setBestScore(score);
        }
        setScore(0);
        setAppStatus(APP_STATUS.PLAYING);
        loseDialogRef.current?.classList.remove('show');
        setGridHandler(new GridHandler(setAppStatus, setScore, setBestScore, setMove, bestScore));
    };

    const keyMap = {
        left: ['left', 'a'],
        right: ['right', 'd'],
        up: ['up', 'w'],
        down: ['down', 's'],
      };
      
    const handlers = {
        left: (event: KeyboardEvent) => {
            gameHandlerRef.current.onLeftKeyDownHandler(event);
            if (!isIA && setLastPlayerMove){
                setLastPlayerMove('left');
            }
        },
        right: (event: KeyboardEvent) => {
            gameHandlerRef.current.onRightKeyDownHandler(event);
            if (!isIA && setLastPlayerMove){
                setLastPlayerMove('right');
            }
        },
        up: (event: KeyboardEvent) => {
            gameHandlerRef.current.onUpKeyDownHandler(event);
            if (!isIA && setLastPlayerMove){
                setLastPlayerMove('up');
            }
        },
        down: (event: KeyboardEvent) => {
            gameHandlerRef.current.onDownKeyDownHandler(event);
            if (!isIA && setLastPlayerMove){
                setLastPlayerMove('down');
            }
        },
    };

    if(isIA && lastPlayerMove){
        //SI METEMOS EL PUTADA MODE, YA TENEMOS AKI EL MOVIMIENTO DEL JUGADOR DE IA
        console.log('IA move');
        console.log(lastPlayerMove);
    }

    return (
        <>
            <div className="gameBoard">
                <div className="tags">
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
                        <Grid gridHandler={gridHandler}/>
                        {Game.appStatus === APP_STATUS.GAME_OVER && !Game.iaPlayer &&
                            <div id="game-over-dialog">
                                <h1>Game over!</h1>
                                <button 
                                    id='try-again-button' 
                                    onClick={()=>{
                                        restartGame();
                                        setGameOver(true);
                                    } } 
                                    autoFocus>Try again</button>
                            </div>
                        }
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
