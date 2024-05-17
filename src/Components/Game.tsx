import Board from "./Board";
import "../Styles/Game.css";
import { useEffect, useState } from "react";
import { MoveOptionsType, APP_STATUS, AppStatusType} from "../enums.ts";
import { putadaMove } from "../types.ts";
import { PunctuationSyntaxKind } from "typescript";

//Craeación del tablero de 2048, es oarte de Game
export const Game = () =>{

    const [lastMove, setLastMove] = useState<MoveOptionsType | null>(null);
    const [forcedUpdate, setForcedUpdate] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [bestScore, setBestScore] = useState(0);
    const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.PLAYING);
    const [appStatusIA, setAppStatusIA] = useState<AppStatusType>(APP_STATUS.WAITING);
    //Si el movimiento es el mismo, se actualizará con el counter
    const [putadaMove, setPutadaMove] = useState<putadaMove>({move: null, counter: 0});

    const [putadaMode, setPutadaMode] = useState(true);
    const handleCheckboxChange = (event) => {
        setPutadaMode(event.target.checked);
      };

    useEffect(() => {
        if (gameOver) {
            setGameOver(false);
        }
    }, [gameOver]);

    return( 
        <>
        <div className="putadaModeDiv">
            <h3>Handicap Mode</h3>
            <label id='putadaModeSwitch' className="switch">
                <input type="checkbox" checked={putadaMode} onChange={handleCheckboxChange}/>
                <span className="slider"></span>
            </label>
        </div>
        <div className="boards">
            <Board isIA={false} lastMove={lastMove} forcedUpdate={forcedUpdate} setForcedUpdate={setForcedUpdate} setLastPlayerMove={setLastMove} setGameOver={setGameOver} setBestScore={setBestScore} bestScore={bestScore} appStatus={appStatus} setAppStatus={setAppStatus} key={gameOver ? 'palyerGame1' : 'PlayerGame2'} putadaMove={putadaMove} setPutadaMove={setPutadaMove} putadaMode={putadaMode}/> 
            <Board isIA={true} lastMove={lastMove} forcedUpdate={forcedUpdate} setForcedUpdate={setForcedUpdate} setGameOver={setGameOver} setBestScore={setBestScore} bestScore={bestScore} appStatus={appStatusIA} setAppStatus={setAppStatusIA} setPlayerAppStatus={setAppStatus} key={gameOver ? 'IAGame1' : 'IAGame2'} putadaMove={putadaMove} setPutadaMove={setPutadaMove} putadaMode={putadaMode}/>
        </div>
        </>
    )
}

export default Game;

//<Board isIA={false} setLastPlayerMove={}/>  El jugador siempre asigna su ultimo movimiento
//<Board isIA={true} lastPlayerMove={}/> La IA es la que la recibe