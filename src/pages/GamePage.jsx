import { useEffect, useState } from "react"
import { answerQuestion, getQuestionsByDifficulty } from "../api/service"
import "./PlayPage.css"
import { Navigate, useLocation, useNavigate } from "react-router-dom"


const GamePage = () => {
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState()
    const [questionNumber, setQuestionNumber] = useState(8)
    const [correctOption, setCorrectOption] = useState()
    const [selectedOption, setSelectedOption] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location?.state?.difficulty && location?.state?.username) {
            getQuestions()
        }
    }, [])

    useEffect(() => {
        if (selectedOption) {
            answerQuestionWithOption()
        }
    }, [selectedOption])
    
    if (!location?.state?.difficulty || !location?.state?.username) {
        return (
            <Navigate to="/play" replace={true} />
        )
    }

    const getQuestions = async () => {
        try {
            const questions = await getQuestionsByDifficulty({ difficulty: location?.state?.difficulty })
            setQuestions(questions)
            setCurrentQuestion(questions[questionNumber])
            setQuestionNumber(prevState => prevState + 1)
        } catch (error) {
            console.error(error)
        }
    }

    const answerQuestionWithOption = async () => {
        try {
            const answerValidation = await answerQuestion({ questionId: currentQuestion.id, option: selectedOption })
            setCorrectOption({ option: selectedOption, isCorrect: answerValidation.answer })
            nextQuestion()
        } catch (error) {
            console.error(error)
        }
    }

    const nextQuestion = () => {
        setTimeout(() => {
            if (questions.length === questionNumber) {
                navigate("/play")
            } else {
                setSelectedOption("")
                setCurrentQuestion(questions[questionNumber])
                setQuestionNumber(prevState => prevState + 1)
                setCorrectOption(undefined)
            }
        }, 2000);
    }

    return (
        <div className="section-container">
            <p>{currentQuestion?.question}</p>
            <button disabled={selectedOption} onClick={() => setSelectedOption("option1")} style={{ backgroundColor: `${correctOption?.option === "option1" ? (correctOption?.isCorrect ? 'green' : 'red') : ''}` }}>{currentQuestion?.option1}</button>
            <button disabled={selectedOption} onClick={() => setSelectedOption("option2")} style={{ backgroundColor: `${correctOption?.option === "option2" ? (correctOption?.isCorrect ? 'green' : 'red') : ''}` }}>{currentQuestion?.option2}</button>
            <button disabled={selectedOption} onClick={() => setSelectedOption("option3")} style={{ backgroundColor: `${correctOption?.option === "option3" ? (correctOption?.isCorrect ? 'green' : 'red') : ''}` }}>{currentQuestion?.option3}</button>
            <button disabled={selectedOption} onClick={() => setSelectedOption("option4")} style={{ backgroundColor: `${correctOption?.option === "option4" ? (correctOption?.isCorrect ? 'green' : 'red') : ''}` }}>{currentQuestion?.option4}</button>
        </div>
    )
}

export default GamePage