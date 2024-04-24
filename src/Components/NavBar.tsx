import '.././Styles/NavBar.css'
import ThemeButton from './ThemeButton';

function NavBar() {
    return (
        <>
            <nav>
                <div className='centrar'></div>
                <ul>
                    <li><a>2048AI</a></li>
                    <li><a>Classic</a></li>
                    <li><a>About</a></li>
                </ul>
                <div className="themeButton">
                    <ThemeButton />
                </div>
            </nav>
      
        </>
    )
}

export default NavBar;