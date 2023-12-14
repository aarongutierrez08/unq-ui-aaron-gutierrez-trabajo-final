import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()

    const navigateToGame = () => {
        navigate(`/game`);
    }

    return (
        <div>
            <div>
                <h1>BATALLA NAVAL</h1>
            </div>

            <div>
                <button onClick={() => navigateToGame()}>
                    PLAY
                </button>
            </div>
        </div>
    );
}
  
export default Home;