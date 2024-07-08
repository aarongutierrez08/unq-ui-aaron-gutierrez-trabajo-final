import { useEffect, useState } from "react"
import { answerQuestion, getQuestionsByDifficulty } from "../api/service"
import "./GamePage.css"
import { Navigate, useLocation, useNavigate } from "react-router-dom"


const GamePage = () => {
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState()
    const [questionNumber, setQuestionNumber] = useState(6)
    const [correctOption, setCorrectOption] = useState()
    const [selectedOption, setSelectedOption] = useState("")
    const [countDown, setCountdown] = useState(30)
    const [correctQuestions, setCorrectQuestions] = useState(0)
    const [optionStyle, setOptionStyle] = useState({})
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
            setCorrectOption(selectedOption)
            setOptionStyle(
                {
                    backgroundColor: `${answerValidation.answer ? 'green' : 'red'}`,
                    color: 'white',
                    borderColor: 'white'
                }
            )
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
                setCorrectOption("")
                setCountdown(30)
            }
        }, 1500);
    }

    const handleSelectOption = (option) => {
        setOptionStyle(
            {
                backgroundColor: '#272754',
                color: '#f0a818',
                borderColor: '#f0a818'
            }
        )
        setSelectedOption(option)
    }

    return (
        <div className="section-container">
            <div className="user">User: <span>{location?.state?.username}</span></div>
            <div className="header-text">
                <div className="difficulty-text">Difficulty: <span className="difficulty-chosen">{location?.state?.difficulty}</span></div>
                <div className="question">{currentQuestion?.question}</div>
            </div>
            <div className="options-container">
                <div className="options-row">
                    <button className="option" disabled={selectedOption || countDown <= 0} onClick={() => handleSelectOption("option1")} style={correctOption === "option1" ? optionStyle : {}}>{currentQuestion?.option1}</button>
                    <button className="option" disabled={selectedOption || countDown <= 0} onClick={() => handleSelectOption("option2")} style={correctOption === "option2" ? optionStyle : {}}>{currentQuestion?.option2}</button>
                </div>
                <div className="options-row">
                    <button className="option" disabled={selectedOption || countDown <= 0} onClick={() => handleSelectOption("option3")} style={correctOption === "option3" ? optionStyle : {}}>{currentQuestion?.option3}</button>
                    <button className="option" disabled={selectedOption || countDown <= 0} onClick={() => handleSelectOption("option4")} style={correctOption === "option4" ? optionStyle : {}}>{currentQuestion?.option4}</button>
                </div>
            </div>
            <div>{countDown <= 0 ? 0 : countDown}</div>
            <div>correctas {correctQuestions} de {questionNumber}/{questions.length}</div>
        </div>
    )
}

export default GamePage