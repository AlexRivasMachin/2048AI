import Board from "./Board";
import "../Styles/Game.css";

//Craeación del tablero de 2048, es oarte de Game
export const Game = () =>{
    return( 
        <>
        <div className="boards">
            <Board isIA={false} key={'playerGame'}/> 
            <Board isIA={true} key={'IAGame'}/>
        </div>
        </>
    )
}

export default Game;

//<Board isIA={false} setLastPlayerMove={}/>  El jugador siempre asigna su ultimo movimiento
//<Board isIA={true} lastPlayerMove={}/> La IA es la que la recibe