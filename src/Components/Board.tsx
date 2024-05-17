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
import {putadaMove} from '../types.ts'

const Board = (
    {isIA, lastMove, bestScore, appStatus, setLastPlayerMove, forcedUpdate, setForcedUpdate, setGameOver, setBestScore, setAppStatus, setPlayerAppStatus, putadaMove, setPutadaMove, putadaMode} : 
    {isIA : boolean, 
    lastMove: MoveOptionsType | null,
    bestScore: number,
    appStatus: AppStatusType,
    setBestScore: React.Dispatch<React.SetStateAction<number>>,
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
    setLastPlayerMove?: React.Dispatch<React.SetStateAction<MoveOptionsType | null>>,
    forcedUpdate: number,
    setForcedUpdate: React.Dispatch<React.SetStateAction<number>>,
    setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>,
    setPlayerAppStatus?: React.Dispatch<React.SetStateAction<AppStatusType>>,
    putadaMove: putadaMove,
    setPutadaMove: React.Dispatch<React.SetStateAction<putadaMove>>,
    putadaMode: boolean
}
) =>{   
    const boardRef = useRef(null);
    const loseDialogRef = useRef<HTMLDivElement | null>(null);

    const [score, setScore] = useState(0);
    const [move, setMove] = useState<MoveOptionsType | null>(null);
    const [gridHandler, setGridHandler] = useState<GridHandler>(new GridHandler(setAppStatus, setScore, setBestScore, setMove, setForcedUpdate, bestScore, isIA, setPlayerAppStatus));

    const blockMoves = useRef(false)

    const [selectedLLM, setSelectedLLM] = useState('llama3-8b-8192');

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

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            document.getElementById('root')!.removeEventListener('click', handleRootClick);
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
        setAppStatus(isIA? APP_STATUS.WAITING : APP_STATUS.PLAYING);
        loseDialogRef.current?.classList.remove('show');
        setGridHandler(new GridHandler(setAppStatus, setScore, setBestScore, setMove, setForcedUpdate, bestScore, isIA));
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
        },
        right: (event: KeyboardEvent) => {
            handleMove(MOVE_OPTIONS.RIGHT);
        },
        up: (event: KeyboardEvent) => {
            handleMove(MOVE_OPTIONS.UP);
        },
        down: (event: KeyboardEvent) => {
            handleMove(MOVE_OPTIONS.DOWN);
        },
    };

    function isValidMove(move: MoveOptionsType): boolean {
        if (appStatus !== APP_STATUS.PLAYING) {
          return false;
        }
    
        return true;
      }
    
    function handleMove(move: MoveOptionsType) {
        const valid = isValidMove(move);
        if (valid && !blockMoves.current) {
            if (!isIA && setLastPlayerMove){
                setLastPlayerMove(move);
            }
            gridHandler.makeMove(move);
        }
    }

    const playerBoard = document.getElementById('board');

    let startX, startY, endX, endY;

    playerBoard?.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });

    playerBoard?.addEventListener('touchmove', function(event) {
        event.preventDefault(); // Evita el desplazamiento de la página mientras se arrastra
        endX = event.touches[0].clientX;
        endY = event.touches[0].clientY;
    });

    playerBoard?.addEventListener('touchend', function(event) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const threshold = 50; // Umbral para considerar un desplazamiento como un movimiento válido

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                // Deslizamiento hacia la derecha
                handleMove(MOVE_OPTIONS.RIGHT);
            } else {
                // Deslizamiento hacia la izquierda
                handleMove(MOVE_OPTIONS.LEFT);
            }
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > threshold) {
            if (deltaY > 0) {
                // Deslizamiento hacia abajo
                handleMove(MOVE_OPTIONS.DOWN);
            } else {
                // Deslizamiento hacia arriba
                handleMove(MOVE_OPTIONS.UP);
            }
        }
    });

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
                gridHandler.requestMoveFromLLM(selectedLLM).then((iaMove) => {
                    setAppStatus(APP_STATUS.WAITING);
                    setPlayerAppStatus(APP_STATUS.PLAYING);
                }).catch((exception) => {
                    console.error(exception);
                    setAppStatus(APP_STATUS.GAME_OVER);
                    setPlayerAppStatus(APP_STATUS.GAME_OVER);
                });
            }else{
                setPutadaMove({move: lastMove, counter: putadaMove.counter + 1});
            }
        }
    }, [gridHandler, lastMove, forcedUpdate, setAppStatus, setPlayerAppStatus, isIA]);

    useEffect(() => {
        if(isIA && putadaMode){
            gridHandler.makeMove(putadaMove.move);
        }
    }, [putadaMove]);

    // WHEN THE IA callback is finished, the player will be able to play
    useEffect(() => {
        if(!isIA && appStatus === APP_STATUS.PLAYING){
            blockMoves.current = false;
        }
    }, [appStatus, isIA]);


    const handleLLMChange = (newLLM) => {
        setSelectedLLM(newLLM);
    };

    return (
        <>
            <div className="gameBoard">
                <div className="tags">
                    <div className="tag">
                        SCORE {Game.score}
                    </div>
                    {
                        !isIA &&
                        <div className="tag">
                            BEST {bestScore}
                        </div>
                    }
                </div>
                {!Game.iaPlayer &&
                    <HotKeys keyMap={keyMap} handlers={handlers}>
                    <div  
                        id='board'
                        className={`board ${appStatus === APP_STATUS.PLAYING ? 'playing' : ''}`}
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
                        {Game.appStatus === APP_STATUS.GAME_WON &&
                            <div id="game-over-dialog">
                                <span>You have win!</span>
                                <button 
                                    id='try-again-button' 
                                    onClick={()=>{
                                        restartGame();
                                        setGameOver(true);
                                    } } 
                                    autoFocus>Play Again</button>
                            </div>
                        }
                        {Game.appStatus === APP_STATUS.WAITING && !Game.iaPlayer &&
                            <div id="waiting-dialog">
                                <span>AI is playing, wait!</span>
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
                        className={`board ${appStatus === APP_STATUS.PLAYING ? 'playing' : ''}`}
                        tabIndex={-1}
                        onClick={handleRootClick}>
                        <Grid gridHandler={gridHandler}/>
                        {Game.appStatus === APP_STATUS.GAME_OVER && Game.iaPlayer &&
                            <div id="game-over-dialog">
                                <span>Game over!</span>
                            </div>
                        }
                        {Game.appStatus === APP_STATUS.GAME_WON &&
                            <div id="game-over-dialog">
                                <span>You have win!</span>
                                <button 
                                    id='try-again-button' 
                                    onClick={()=>{
                                        restartGame();
                                        setGameOver(true);
                                    } } 
                                    autoFocus>Play Again</button>
                            </div>
                        }
                    </div>
                }
                <div className="tag" id='playertag'>
                        {Game.iaPlayer ? 'IA' : 'Player'}
                </div>
                {
                    isIA &&
                    <div id='llmSelector'>
                        <button 
                            className={selectedLLM === 'llama3-8b-8192' ? 'enabled' : ''} 
                            onClick={() => handleLLMChange('llama3-8b-8192')}
                        >
                            llama3-8b-8192
                        </button>
                        <button 
                            className={selectedLLM === 'gemma-7b-it' ? 'enabled' : ''} 
                            onClick={() => handleLLMChange('gemma-7b-it')}
                        >
                            gemma-7b-it
                        </button>
                    </div>
                }
            </div>
        </>
    );
}

export default Board;
