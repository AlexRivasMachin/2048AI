import './Styles/App.css'
import NavBar from './Components/NavBar.tsx'
import Footer from './Components/Footer.tsx'
import Game from './Components/Game.tsx'
import { useState } from 'react'

const APP_STATUS = {
  PLAYING: 'playing',
  GAME_OVER: 'game-over',
  GAME_WON: 'game-won',
  IA_PLAYER: 'ia-player'
} as const;

const MOVE_OPTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right'
} as const;

type AppStatus = typeof APP_STATUS[keyof typeof APP_STATUS];
export type MoveOptions = typeof MOVE_OPTIONS[keyof typeof MOVE_OPTIONS];

function App() {

  const [appStatus, setAppStatus] = useState<AppStatus>(APP_STATUS.PLAYING);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [move, setMove] = useState<MoveOptions | null>(null);

 const handleMove = (lastMove: MoveOptions) => {

    if (appStatus !== APP_STATUS.PLAYING) {
      return;
    }

    if(lastMove === move){ // no se puede hacer el mismo movimiento dos veces seguidas
      return;
    }


    setMove(move);
  }
  return (
    <>
      
      <NavBar />
      <h1 id='logo'>
        <span id='logoMain'>2048</span>
        <span id='logoAi'>AI</span>
      </h1>
      <Game lastmove={move}/>
      <Footer />
    </>
  )
}


export default App
