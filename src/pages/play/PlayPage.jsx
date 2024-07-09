import { useEffect, useState } from "react"
import { getDifficulty } from "../../api/service"
import "./PlayPage.css"
import { useLocation, useNavigate } from "react-router-dom"
import LoaderContainer from "../../components/LoaderContainer"

const PlayPage = () => {
    const [difficulties, setDifficulties] = useState([])
    const [difficulty, setDifficulty] = useState("")
    const location = useLocation()
    const [values, setValues] = useState({ username: `${location?.state?.username ? location?.state?.username : ''}` })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
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
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getDifficulties()
    }, [])

    return (
        <form className="section-container" onSubmit={handleSubmit}>
            <div className="choose">
                <label className='form-label' htmlFor="username">Choose your username</label>
                <input
                    className="form-input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    value={values.username}
                    onChange={handleChange}
                    maxLength={10}
                    required
                />
                <div>Choose the difficulty</div>
            </div>
            <div className="difficulties-container">
            <LoaderContainer showLoading={loading}>

                {error
                    ? <div className="error-difficulties">Error getting difficulties, try again later</div>
                    : 
                        <>
                            {difficulties.map(difficulty => {
                                return (
                                    <button className="difficulty" key={difficulty} type="submit" onClick={() => setDifficulty(difficulty)}>{difficulty}</button>
                                )
                            })}
                        </>
                }
            </LoaderContainer>
            </div>
        </form>
    )
}

export default PlayPage