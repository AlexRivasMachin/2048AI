import '.././Styles/Footer.css'

function Footer() {
    return (
        <footer>
            <section>
                <div className="top">
                    <div className="content">
                        <p><strong>Personal Githubs:</strong></p>
                        <ul>
                            <li>GitHub:<a target='_blank' href='https://Github.com/MartinLopezDeIpina'> MartinLopezDeIpina</a></li>
                            <li>GitHub: <a target='_blank' href='https://Github.com/gomezbc'> gomezbc</a></li>
                            <li>GitHub: <a target='_blank' href='https://Github.com/AlexRivasMachin'> AlexRivasMachin</a></li>
                        </ul>
                    </div>
                    <div className="content">
                        <p><strong>Personal portfolios:</strong></p>
                        <ul>
                            <li>Portolio: <a target='_blank' href='https://lopezdeipina.eus/'> MartinLopezDeIpina</a></li>
                            <li>Portolio: <a target='_blank' href='https://borjagomez.eus/'> gomezbc</a></li>
                            <li>Portolio: <a target='_blank' href='https://alexdev.eus'> AlexRivasMachin</a></li>
                        </ul>
                    </div>
                    <div className="content">
                        <p><strong>Link to the repository</strong></p>
                        <ul>
                            <li>Repository: <a target='_blank' href='https://github.com/AlexRivasMachin/2048AI'> 2048-AI</a></li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="bot">
                <div className="copy">
                    <p>© 2024 All rights are reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
