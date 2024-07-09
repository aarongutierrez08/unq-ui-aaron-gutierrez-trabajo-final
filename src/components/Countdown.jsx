import '../pages/game/GamePage.css'

const Countdown = ({ current }) => {

    return (
        <div className={`countdown ${current <= 5 ? "five-less" : ""}`}>
            <div>
                {current <= 0 ? 0 : current}
            </div>
        </div>
    )
}

export default Countdown