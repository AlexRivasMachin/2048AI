import Board from "./Board";
import "../Styles/Game.css";
import { useEffect, useState } from "react";
import { MoveOptionsType, APP_STATUS, AppStatusType} from "../enums.ts";

//Craeación del tablero de 2048, es oarte de Game
export const Game = () =>{

    const [lastMove, setLastMove] = useState<MoveOptionsType | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [bestScore, setBestScore] = useState(0);
    const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.PLAYING);
    const [appStatusIA, setAppStatusIA] = useState<AppStatusType>(APP_STATUS.WAITING);

    useEffect(() => {
        if (gameOver) {
            setGameOver(false);
        }
    }, [gameOver]);

    return( 
        <>
        <div className="boards">
            <Board isIA={false} lastMove={lastMove} setLastPlayerMove={setLastMove} setGameOver={setGameOver} setBestScore={setBestScore} bestScore={bestScore} appStatus={appStatus} setAppStatus={setAppStatus} key={gameOver ? 'palyerGame1' : 'PlayerGame2'}/> 
            <Board isIA={true} lastMove={lastMove} setGameOver={setGameOver} setBestScore={setBestScore} bestScore={bestScore} appStatus={appStatusIA} setAppStatus={setAppStatusIA} setPlayerAppStatus={setAppStatus} key={gameOver ? 'IAGame1' : 'IAGame2'}/>
        </div>
        </>
    )
}

export default Game;

//<Board isIA={false} setLastPlayerMove={}/>  El jugador siempre asigna su ultimo movimiento
//<Board isIA={true} lastPlayerMove={}/> La IA es la que la recibe