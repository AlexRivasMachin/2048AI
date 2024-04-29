import { useState } from 'react'
import './Styles/App.css'
import NavBar from './Components/NavBar.tsx'
import Footer from './Components/Footer.tsx'
import Game from './Components/Game.tsx'


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
