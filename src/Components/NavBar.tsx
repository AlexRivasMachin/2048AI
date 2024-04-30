import '.././Styles/NavBar.css'
import ThemeButton from './ThemeButton';

function NavBar() {
    return (
        <>
            <nav>
                <div className='centrar'></div>
                <ul>
                    <li><a href='/'>2048AI</a></li>
                    <li><a href='/classic'>Classic</a></li>
                    <li><a href='/about'>About</a></li>
                </ul>
                <div className="themeButton">
                    <ThemeButton />
                </div>
            </nav>
      
        </>
    )
}

export default NavBar;