import { Outlet } from "react-router-dom";
import '../Styles/App.css'
import NavBar from '../Components/NavBar.tsx'
import Footer from '../Components/Footer.tsx'

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
      <Footer />
    </>
  )
}


export default App
