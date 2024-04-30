import Board from "./Board";


//Craeación del tablero de 2048, es oarte de Game
export const Game = () =>{

    return( 
        <>
            <Board isIA={false}/>
        </>
    )
}

export default Game;