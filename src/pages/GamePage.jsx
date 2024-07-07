import { useEffect, useState } from "react"
import { answerQuestion, getQuestionsByDifficulty } from "../api/service"
import "./PlayPage.css"
import { Navigate, useLocation, useNavigate } from "react-router-dom"


const GamePage = () => {
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState()
    const [questionNumber, setQuestionNumber] = useState(6)
    const [correctOption, setCorrectOption] = useState()
    const [selectedOption, setSelectedOption] = useState("")
    const [countDown, setCountdown] = useState(30)
    const [correctQuestions, setCorrectQuestions] = useState(0)
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

    useEffect(() => {
        if (countDown === 0 || correctOption) {
            nextQuestion()
        }

        const intervalId = setInterval(() => {
            setCountdown(prevState => selectedOption ? prevState : prevState - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [countDown, correctOption])
    
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
            if (answerValidation.answer) setCorrectQuestions(prevState => prevState + 1)
        } catch (error) {
            console.error(error)
        }
    }

    const nextQuestion = () => {
        setTimeout(() => {
            if (questions.length === questionNumber) {
                navigate("/finish", { state: { correctQuestions, username: location?.state?.username }, replace: true })
            } else {
                setSelectedOption("")
                setCurrentQuestion(questions[questionNumber])
                setQuestionNumber(prevState => prevState + 1)
                setCorrectOption(undefined)
                setCountdown(30)
            }
        }, 2000);
    }

    return (
        <div className="section-container">
            <div>{currentQuestion?.question}</div>
            <button disabled={selectedOption || countDown <= 0} onClick={() => setSelectedOption("option1")} style={{ backgroundColor: `${correctOption?.option === "option1" ? (correctOption?.isCorrect ? 'green' : 'red') : ''}` }}>{currentQuestion?.option1}</button>
            <button disabled={selectedOption || countDown <= 0} onClick={() => setSelectedOption("option2")} style={{ backgroundColor: `${correctOption?.option === "option2" ? (correctOption?.isCorrect ? 'green' : 'red') : ''}` }}>{currentQuestion?.option2}</button>
            <button disabled={selectedOption || countDown <= 0} onClick={() => setSelectedOption("option3")} style={{ backgroundColor: `${correctOption?.option === "option3" ? (correctOption?.isCorrect ? 'green' : 'red') : ''}` }}>{currentQuestion?.option3}</button>
            <button disabled={selectedOption || countDown <= 0} onClick={() => setSelectedOption("option4")} style={{ backgroundColor: `${correctOption?.option === "option4" ? (correctOption?.isCorrect ? 'green' : 'red') : ''}` }}>{currentQuestion?.option4}</button>
            <div>{countDown <= 0 ? 0 : countDown}</div>
            <div>correctas {correctQuestions} de {questionNumber}/{questions.length}</div>
        </div>
    )
}

export default GamePage