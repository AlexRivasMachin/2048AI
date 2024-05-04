import Board from "./Board";
import "../Styles/Game.css";
import { useState } from "react";
import { MoveOptionsType } from "../enums";

//Craeación del tablero de 2048, es oarte de Game
export const Game = () =>{

    const [lastPlayerMove, setLastPlayerMove] = useState<MoveOptionsType | null>(null);

    return( 
        <>
        <div className="boards">
            <Board isIA={false} setLastPlayerMove={setLastPlayerMove}/> 
            <Board isIA={true} lastPlayerMove={lastPlayerMove}/>
        </div>
        </>
    )
}

export default Game;

//<Board isIA={false} setLastPlayerMove={}/>  El jugador siempre asigna su ultimo movimiento
//<Board isIA={true} lastPlayerMove={}/> La IA es la que la recibe