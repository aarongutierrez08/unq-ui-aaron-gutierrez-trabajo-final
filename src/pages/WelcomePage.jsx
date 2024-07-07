import { useLocation, useNavigate } from "react-router-dom"

const WelcomePage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div className="section-container">
            <p>{location?.state?.username} obtuviste respuestas correctas: {location?.state?.correctQuestions} de 10 preguntas</p>
            <button onClick={() => navigate("/play", { state: { username: location?.state?.username } })}>Volver a jugar</button>
        </div>
    )
}

export default WelcomePage