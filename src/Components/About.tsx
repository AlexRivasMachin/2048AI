const About = () => {
    return (
        <div className='about'>
            <h1>About</h1>
            <p>In this project, we've developed a software that recreates the game 2048 with additional features. The original 2048 challenges players to sequentially match numbers that are powers of 2 until reaching 2048.</p>

            <p>To innovate and go beyond a simple replica, we've incorporated several enhancements. The most notable is the inclusion of an Artificial Intelligence (AI) opponent. This AI analyzes its board after each move to determine the optimal play and attempt to win. It also features multiple difficulty levels, allowing players to adjust the challenge to their skill level.</p>

            <p>We also offer a classic mode, providing the original 2048 experience without any additions. Additionally, we've included a handicap mode, where each player's move is mirrored on the AI's board, adding variety and increasing the challenge for AI players.</p>

            <p>Last but not least, our web application features a custom design and the option to switch between light and dark modes, allowing users to personalize the aesthetic according to their preferences.</p>
            <p>Created by <a href='https://alexdev.eus/' target='_blank'>Alex</a>, <a href='https://lopezdeipina.eus/' target='_blank'>Martin</a> and <a href='https://borjagomez.eus/' target='_blank'>Borja</a>.</p>
        </div>
    );
};

export default About;