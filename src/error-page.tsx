import './Styles/App.css'
import NavBar from './Components/NavBar.tsx'
import Footer from './Components/Footer.tsx'

function ErrorPage() {

  return (
    <>
      <NavBar />
      <h1 id='logo'>
        <span id='logoMain'>2048</span>
        <span id='logoAi'>AI</span>
      </h1>
      <h2>404 Page not found</h2>
      <Footer />
    </>
  )
}


export default ErrorPage
