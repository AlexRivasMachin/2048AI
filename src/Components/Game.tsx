import Board from "./Board";
import "../Styles/Game.css";

//Craeación del tablero de 2048, es oarte de Game
export const Game = () =>{

    return( 
        <>
        <div className="boards">
            <Board isIA={false}/>
            <Board isIA={true}/>
        </div>
        </>
    )
}

export default Game;