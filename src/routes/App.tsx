import { Outlet, Route, Routes } from "react-router-dom";
import '../Styles/App.css'
import NavBar from '../Components/NavBar.tsx'
import Footer from '../Components/Footer.tsx'
import Game from '../Components/Game.tsx'
import GameClassic from '../Components/GameClassic.tsx'
import About from '../Components/About.tsx'
import ErrorPage from "../error-page";

function App() {

  return (
    <>
      <NavBar />
      <h1 id='logo'>
        <span id='logoMain'>2048</span>
        <span id='logoAi'>AI</span>
      </h1>
      <div id="detail">
        <Outlet />
      </div>
      <Routes>
         <Route path='/' element={<Game/>} />
         <Route path='/classic' element={<GameClassic/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/*' element={<ErrorPage/>} />
       </Routes>
      <Footer />
    </>
  )
}


export default App
