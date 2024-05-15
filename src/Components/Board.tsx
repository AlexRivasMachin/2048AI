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
import {APP_STATUS, AppStatusType, MoveOptionsType, MOVE_OPTIONS} from '../enums.ts'
import { GridHandler } from '../services/Grid.ts';

const Board = (
    {isIA, lastMove, bestScore, appStatus, setLastPlayerMove, setGameOver, setBestScore, setAppStatus, setPlayerAppStatus} : 
    {isIA : boolean, 
    lastMove: MoveOptionsType | null,
    bestScore: number,
    appStatus: AppStatusType,
    setBestScore: React.Dispatch<React.SetStateAction<number>>,
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
    setLastPlayerMove?: React.Dispatch<React.SetStateAction<MoveOptionsType | null>>,
    setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>,
    setPlayerAppStatus?: React.Dispatch<React.SetStateAction<AppStatusType>>}
) =>{
    const boardRef = useRef(null);
    const loseDialogRef = useRef<HTMLDivElement | null>(null);

    const [score, setScore] = useState(0);
    const [move, setMove] = useState<MoveOptionsType | null>(null);
    const [gridHandler, setGridHandler] = useState<GridHandler>(new GridHandler(setAppStatus, setScore, setBestScore, setMove, bestScore));

    const blockMoves = useRef(false)

    const Game: GameType = {
        grid: gridHandler,
        score: score,
        bestScore: bestScore,
        appStatus: appStatus,
        lastMove: move,
        iaPlayer: isIA
    }

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
            handleMove(MOVE_OPTIONS.LEFT);
            if (!isIA && setLastPlayerMove){
                setLastPlayerMove(MOVE_OPTIONS.LEFT);
            }
        },
        right: (event: KeyboardEvent) => {
            handleMove(MOVE_OPTIONS.RIGHT);
            if (!isIA && setLastPlayerMove){
                setLastPlayerMove(MOVE_OPTIONS.RIGHT);
            }
        },
        up: (event: KeyboardEvent) => {
            handleMove(MOVE_OPTIONS.UP);
            if (!isIA && setLastPlayerMove){
                setLastPlayerMove(MOVE_OPTIONS.UP);
            }
        },
        down: (event: KeyboardEvent) => {
            handleMove(MOVE_OPTIONS.DOWN);
            if (!isIA && setLastPlayerMove){
                setLastPlayerMove(MOVE_OPTIONS.DOWN);
            }
        },
    };

    function isValidMove(move: MoveOptionsType): boolean {
        if (appStatus !== APP_STATUS.PLAYING) {
          return false;
        }
    
        if (lastMove === move) {
          // no se puede hacer el mismo movimiento dos veces seguidas
          return false;
        }
    
        return true;
      }
    
    function handleMove(move: MoveOptionsType) {
        const valid = isValidMove(move);
        if (valid && !blockMoves.current) {
            gridHandler.makeMove(move);
        }
    }

    /**
     * WHEN THE PLAYER MOVES, THIS BLOCK IS TRIGGERS
     * THE PLAYER GAME WILL BE IN WAITING STATUS UNTIL THE IA MAKES A MOVE
     * THEN THE IA GAME WILL BE IN WAITING STATUS UNTIL THE PLAYER MAKES A MOVE
     */
    useEffect(() => {
        if(lastMove !== null && lastMove !== undefined){
            setAppStatus(isIA ? APP_STATUS.PLAYING : APP_STATUS.WAITING);
            blockMoves.current = isIA ? false : true;
            // IF is necessary, otherwise it would call two times the IA
            if(isIA){
                gridHandler.requestMoveFromLLM().then((iaMove) => {
                    gridHandler.makeMove(iaMove);
                    setPlayerAppStatus(APP_STATUS.PLAYING);
                }).catch(() => {
                    setAppStatus(APP_STATUS.GAME_OVER);
                    setPlayerAppStatus(APP_STATUS.GAME_OVER);
                });
            } 
        }
    }, [gridHandler, lastMove, setAppStatus, setPlayerAppStatus, isIA]);

    // WHEN THE IA callback is finished, the player will be able to play
    useEffect(() => {
        if(!isIA && appStatus === APP_STATUS.PLAYING){
            blockMoves.current = false;
        }
    }, [appStatus, isIA]);

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
                {!Game.iaPlayer &&
                    <HotKeys keyMap={keyMap} handlers={handlers}>
                    <div  
                        id='board'
                        className="board"
                        tabIndex={0}
                        ref={boardRef}>
                        <Grid gridHandler={gridHandler}/>
                        {Game.appStatus === APP_STATUS.GAME_OVER && !Game.iaPlayer &&
                            <div id="game-over-dialog">
                                <span>Game over!</span>
                                <button 
                                    id='try-again-button' 
                                    onClick={()=>{
                                        restartGame();
                                        setGameOver(true);
                                    } } 
                                    autoFocus>Try again</button>
                            </div>
                        }
                        {Game.appStatus === APP_STATUS.WAITING && !Game.iaPlayer &&
                            <div id="waiting-dialog">
                                <span>IA is palying, wait!</span>
                                <div className="loader">
                                    <div className="jimu-primary-loading"></div>
                                </div>
                            </div>
                        }
                    </div>
                    </HotKeys>
                }
                {Game.iaPlayer &&
                    <div  
                        id='boardIA'
                        className="board"
                        tabIndex={-1}
                        onClick={handleRootClick}>
                        <Grid gridHandler={gridHandler}/>
                    </div>
                }
                <div className="tag" id='playertag'>
                        {Game.iaPlayer ? 'IA' : 'Player'} {appStatus}
                </div>
            </div>
        </>
    );
}

export default Board;
