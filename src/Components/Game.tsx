import Board from "./Board";
import "../Styles/Game.css";
import { useEffect, useState } from "react";
import { MoveOptionsType } from "../enums";

//Craeación del tablero de 2048, es oarte de Game
export const Game = () =>{

    const [lastPlayerMove, setLastPlayerMove] = useState<MoveOptionsType | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [bestScore, setBestScore] = useState(0);

    useEffect(() => {
        if (gameOver) {
            setGameOver(false);
        }
    }, [gameOver]);

    return( 
        <>
        <div className="boards">
            <Board isIA={false} setLastPlayerMove={setLastPlayerMove} setGameOver={setGameOver} setBestScore={setBestScore} bestScore={bestScore} key={'playerGame'}/> 
            <Board isIA={true} lastPlayerMove={lastPlayerMove} setGameOver={setGameOver} setBestScore={setBestScore} bestScore={bestScore} key={'IAGame'}/>
        </div>
        </>
    )
}

export default Game;

//<Board isIA={false} setLastPlayerMove={}/>  El jugador siempre asigna su ultimo movimiento
//<Board isIA={true} lastPlayerMove={}/> La IA es la que la recibe