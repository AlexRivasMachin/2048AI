import '.././Styles/Footer.css'

function Footer() {
    return (
        <footer>
            <section>
                    <div className="top">
                        <div className="content">
                            <p><strong>Github personales:</strong></p>
                                <ul>
                                    <li>GitHub:<a target='_blank' href='https://Github.com/MartinLopezDeIpina'> MartinLopezDeIpina</a></li>
                                    <li>GitHub: <a target='_blank' href='https://Github.com/gomezbc'> gomezbc</a></li>
                                    <li>GitHub: <a target='_blank' href='https://Github.com/AlexRivasMachin'> AlexRivasMachin</a></li>
                                </ul>
                        </div>
                        <div className="content">
                            <p><strong>Portolios personales:</strong></p>
                                <ul>
                                    <li>Portolio: <a target='_blank' href='https://lopezdeipina.eus/'> MartinLopezDeIpina</a></li>
                                    <li>Portolio: <a target='_blank' href='https://borjagomez.eus/'> gomezbc</a></li>
                                    <li>Portolio: <a target='_blank' href='https://alexdev.eus'> AlexRivasMachin</a></li>
                                </ul>
                        </div>
                        <div className="content">
                            <p><strong>Link al repositorio</strong></p>
                                <ul>
                                    <li>Repositorio: <a> 2048-AI</a></li>
                                </ul>
                        </div>
                    </div>
                    <div className="bot">
                        <div className="copy">
                            <p>© 2024 todos los derechos reservados</p>
                        </div>
                    </div>
            </section>
        </footer>
    )
}

export default Footer;