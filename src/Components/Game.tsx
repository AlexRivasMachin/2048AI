import { MoveOptions } from "../App";
import Board from "./Board";


//Craeación del tablero de 2048, es oarte de Game
export const Game = ({lastmove} : {lastmove : MoveOptions}) =>{

    //handleMove  y tener un move, en el tablero que se pasa desde el game hasta el board

    

    return( 
        <>
            <Board move={lastmove}/>
        </>
    )
}

export default Game;