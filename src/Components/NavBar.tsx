import { Link } from "react-router-dom";
import '.././Styles/NavBar.css'
import ThemeButton from './ThemeButton';

function NavBar() {
    return (
        <>
            <nav>
                <div className='centrar'></div>
                <ul>
                    <li><Link to="/">2048AI</Link></li>
                    <li><Link to="/classic">Classic</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
                <div className="themeButton">
                    <ThemeButton />
                </div>
            </nav>
      
        </>
    )
}

export default NavBar;