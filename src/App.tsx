import './Styles/App.css'
import NavBar from './Components/NavBar.tsx'
import Footer from './Components/Footer.tsx'
import Game from './Components/Game.tsx'

const APP_STATUS = {
  PLAYING: 'playing',
  GAME_OVER: 'game-over',
  GAME_WON: 'game-won',
  IA_PLAYER: 'ia-player'
} as const;

type AppStatus = typeof APP_STATUS[keyof typeof APP_STATUS];

function App() {
  return (
    <>
      
      <NavBar />
      <h1 id='logo'>
        <span id='logoMain'>2048</span>
        <span id='logoAi'>AI</span>
      </h1>
      <Game />
      <Footer />
    </>
  )
}


export default App
