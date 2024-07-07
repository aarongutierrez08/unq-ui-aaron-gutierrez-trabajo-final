import { useNavigate } from "react-router-dom"
import './WelcomePage.css'

const WelcomePage = () => {
    const navigate = useNavigate()

    const handleNavigateToPlay = () => {
        navigate("/play")
    }

    return (
        <div className="section-container">
            <div className="welcome-text">
                Welcome to <span className="bold-text">TriviaPolis</span>
            </div>
            <div className="play-button-container">
                <button className="play-button bold-text" onClick={handleNavigateToPlay}>Play</button>
            </div>
        </div>
    )
}

export default WelcomePage