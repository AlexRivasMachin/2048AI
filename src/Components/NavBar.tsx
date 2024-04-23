import '.././Styles/NavBar.css'
import ThemeButton from './ThemeButton';

function NavBar() {
    return (
        <nav>
            <ThemeButton />
            <ul>
                <li><a>2048AI</a></li>
                <li><a>Classic</a></li>
                <li><a>About</a></li>
            </ul>
        </nav>
    )
}

export default NavBar;