import { useLocation, useNavigate } from "react-router-dom"
import "./FinishPage.css"

const FinishPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div className="section-container">
            <div className="text-container">
                <div className="user-finish">{location?.state?.username}</div>
                <div className="result-text">
                    {
                        location?.state?.correctQuestions < 5 
                        ? (
                        <>
                            OH, you nailed <span>{location?.state?.correctQuestions}/{location?.state?.totalQuestions}</span> questions!
                        </>
                        ) 
                        : (
                        <>
                            CONGRATS, you nailed <span>{location?.state?.correctQuestions} / {location?.state?.totalQuestions}</span> questions!
                        </>
                        )
                    }
                </div>
            </div>
            <div className="play-againg-button-container">
                <button className="play-againg-button" onClick={() => navigate("/play", { state: { username: location?.state?.username } })}>Play again</button>
            </div>
        </div>
    )
}

export default FinishPage