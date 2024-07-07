import { useLocation, useNavigate } from "react-router-dom"
import "./FinishPage.css"

const FinishPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div className="section-container">
            <div className="result-text">{location?.state?.username} obtuviste respuestas correctas: {location?.state?.correctQuestions} de 10 preguntas</div>
            <div className="play-againg-button-container">
                <button className="play-againg-button" onClick={() => navigate("/play", { state: { username: location?.state?.username } })}>Play again</button>
            </div>
        </div>
    )
}

export default FinishPage