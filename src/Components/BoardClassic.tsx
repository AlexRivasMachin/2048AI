import React, { useRef, useEffect, useState } from 'react';
import { HotKeys } from 'react-hotkeys';
import '../Styles/Board.css'
import '../Styles/Dialog.css'
import Grid from './Grid.tsx';
import type {Game as GameType} from '../types.ts'
import {APP_STATUS, AppStatusType, MoveOptionsType, MOVE_OPTIONS} from '../enums.ts'
import { GridHandler } from '../services/Grid.ts';

const Board = (
    {isIA, bestScore, appStatus, setLastPlayerMove, setForcedUpdate, setGameOver, setBestScore, setAppStatus} : 
    {isIA : boolean, 
    bestScore: number,
    appStatus: AppStatusType,
    setBestScore: React.Dispatch<React.SetStateAction<number>>,
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
    setLastPlayerMove?: React.Dispatch<React.SetStateAction<MoveOptionsType | null>>,
    setForcedUpdate: React.Dispatch<React.SetStateAction<number>>,
    setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>,}
) =>{
    const boardRef = useRef(null);
    const loseDialogRef = useRef<HTMLDivElement | null>(null);

    const [score, setScore] = useState(0);
    const [move, setMove] = useState<MoveOptionsType | null>(null);
    const [gridHandler, setGridHandler] = useState<GridHandler>(new GridHandler(setAppStatus, setScore, setBestScore, setMove, setForcedUpdate, bestScore, isIA));

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
        if (boardRef.current){
            (boardRef.current as HTMLElement).focus();
        }
    }, []);

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
        event.preventDefault();
        endX = event.touches[0].clientX;
        endY = event.touches[0].clientY;
    });

    playerBoard?.addEventListener('touchend', function(event) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const threshold = 50;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                handleMove(MOVE_OPTIONS.RIGHT);
            } else {
                handleMove(MOVE_OPTIONS.LEFT);
            }
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > threshold) {
            if (deltaY > 0) {
                handleMove(MOVE_OPTIONS.DOWN);
            } else {
                handleMove(MOVE_OPTIONS.UP);
            }
        }
    });

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
                    </div>
                    </HotKeys>
                }
                <div className="tag" id='playertag'>
                        {Game.iaPlayer ? 'IA' : 'Player'}
                </div>
            </div>
        </>
    );
}

export default Board;
