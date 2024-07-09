import { Navigate, useLocation, useNavigate } from "react-router-dom"
import "./FinishPage.css"

const FinishPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    if (!location?.state?.correctQuestions || !location?.state?.totalQuestions) {
        return (
            <Navigate to="/play" replace={true} />
        )
    }

    return (
        <div className="section-container">
            <div className="text-container">
                <div className="user-finish">
                    {location?.state?.correctQuestions < 5 ? (<>Oh, </>) : (<>Congrats, </>)}
                    <span>{location?.state?.username}</span>
                </div>
                <div className="result-text">
                    you nailed <span>{location?.state?.correctQuestions}/{location?.state?.totalQuestions}</span> questions!
                </div>
            </div>
            <div className="play-againg-button-container">
                <button className="play-againg-button" onClick={() => navigate("/play", { state: { username: location?.state?.username } })}>Play again</button>
            </div>
        </div>
    )
}

export default FinishPage