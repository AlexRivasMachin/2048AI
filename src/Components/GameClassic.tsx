import BoardClassic from "./BoardClassic.tsx";
import "../Styles/Game.css";
import { useEffect, useState } from "react";
import { MoveOptionsType, APP_STATUS, AppStatusType} from "../enums.ts";

export const GameClassic = () =>{

    const [_lastMove, setLastMove] = useState<MoveOptionsType | null>(null);
    const [_forcedUpdate, setForcedUpdate] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [bestScore, setBestScore] = useState(0);
    const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.PLAYING);

    useEffect(() => {
        if (gameOver) {
            setGameOver(false);
        }
    }, [gameOver]);

    return( 
        <>
        <div className="boards">
            <BoardClassic isIA={false} setForcedUpdate={setForcedUpdate} setLastPlayerMove={setLastMove} setGameOver={setGameOver} setBestScore={setBestScore} bestScore={bestScore} appStatus={appStatus} setAppStatus={setAppStatus} key={gameOver ? 'palyerGame1' : 'PlayerGame2'}/>
        </div>
        </>
    )
}

export default GameClassic;