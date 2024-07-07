import { useEffect, useState } from "react"
import { getDifficulty } from "../api/service"
import "./PlayPage.css"
import { useLocation, useNavigate } from "react-router-dom"

// const INITIAL_STATE = { username: '' }

const PlayPage = () => {
    const [difficulties, setDifficulties] = useState([])
    const [difficulty, setDifficulty] = useState("")
    const location = useLocation()
    const [values, setValues] = useState({ username: `${location?.state?.username ? location?.state?.username : ''}` })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({
          ...values,
          [name]: value,
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate("/game", { state: { difficulty, username: values.username } })
    }

    const getDifficulties = async () => {
        try {
            const difficulties = await getDifficulty()
            setDifficulties(difficulties)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getDifficulties()
    }, [])

    return (
        <form className="section-container" onSubmit={handleSubmit}>
            <div className="choose-username">
                <label className='form-label' htmlFor="username">Choose your username</label>
                <input
                    className="form-input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    value={values.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="difficulties-container">
                {difficulties.map(difficulty => {
                    return (
                        <button className="difficulty" key={difficulty} type="submit" onClick={() => setDifficulty(difficulty)}>{difficulty}</button>
                    )
                })}
            </div>
        </form>
    )
}

export default PlayPage