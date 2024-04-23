import { useState } from 'react'
import './Styles/App.css'
import NavBar from './Components/NavBar.tsx'
import Footer from './Components/Footer.tsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <h1 id='logo'>
        <span id='logoMain'>2048</span>
        <span id='logoAi'>AI</span>
      </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Footer />
    </>
  )
}


export default App
