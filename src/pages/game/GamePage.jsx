/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { answerQuestion, getQuestionsByDifficulty } from "../../api/service"
import "./GamePage.css"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import LoaderContainer from "../../components/LoaderContainer"
import Countdown from "../../components/Countdown"

const INITIAL_COUNTDOWN = 60

const ACTIVE_OPTION_STYLE = {
    backgroundColor: '#272754',
    color: 'white',
    border: '1px solid white'
}

const GamePage = () => {
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState()
    const [questionNumber, setQuestionNumber] = useState(0)
    const [correctOption, setCorrectOption] = useState()
    const [selectedOption, setSelectedOption] = useState("")
    const [countDown, setCountdown] = useState(INITIAL_COUNTDOWN)
    const [correctQuestions, setCorrectQuestions] = useState(0)
    const [optionStyle, setOptionStyle] = useState({})
    const [loading, setLoading] = useState(true)
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

        let intervalId
        if (questions.length > 0) {
            intervalId = setInterval(() => {
                setCountdown(prevState => selectedOption ? prevState : prevState - 1)
            }, 1000)
        }

        return () => clearInterval(intervalId)
    }, [countDown, correctOption, questions])
    
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
            navigate("/finish", { state: { correctQuestions, username: location?.state?.username, totalQuestions: questions?.length, error }, replace: true })
        } finally {
            setLoading(false)
        }
    }

    const answerQuestionWithOption = async () => {
        try {
            const answerValidation = await answerQuestion({ questionId: currentQuestion.id, option: selectedOption })
            setCorrectOption(selectedOption)
            setOptionStyle(prevState => { return { ...prevState, backgroundColor: `${answerValidation.answer ? 'green' : 'red'}` }})
            if (answerValidation.answer) setCorrectQuestions(prevState => prevState + 1)
        } catch (error) {
            navigate("/finish", { state: { correctQuestions, username: location?.state?.username, totalQuestions: questions?.length, error }, replace: true })
        }
    }

    const nextQuestion = () => {
        setTimeout(() => {
            if (questions.length === questionNumber) {
                navigate("/finish", { state: { correctQuestions, username: location?.state?.username, totalQuestions: questions?.length }, replace: true })
            } else {
                setSelectedOption("")
                setCurrentQuestion(questions[questionNumber])
                setQuestionNumber(prevState => prevState + 1)
                setCorrectOption("")
                setCountdown(INITIAL_COUNTDOWN)
            }
        }, 1500);
    }

    const handleSelectOption = (option) => {
        setOptionStyle(ACTIVE_OPTION_STYLE)
        setSelectedOption(option)
    }

    return (
        <div className="section-container">
            <div className="header">
                <div className="user">User: <span>{location?.state?.username}</span></div>
                <button className="exit-button" onClick={() => navigate("/finish", { state: { correctQuestions, username: location?.state?.username, totalQuestions: questions?.length }, replace: true })}>Salir</button>
            </div>
            <div className="header-text-center">
                <div className="difficulty-text">Difficulty: <span className="difficulty-chosen">{location?.state?.difficulty}</span></div>
                <div className="question">{currentQuestion?.question}</div>
            </div>
            <div className="options-container">
                <LoaderContainer showLoading={loading}>
                    <div className="options-row">
                        <button className="option" disabled={selectedOption || countDown <= 0} onClick={() => handleSelectOption("option1")} style={selectedOption === "option1" ? optionStyle : {}}>{currentQuestion?.option1}</button>
                        <button className="option" disabled={selectedOption || countDown <= 0} onClick={() => handleSelectOption("option2")} style={selectedOption === "option2" ? optionStyle : {}}>{currentQuestion?.option2}</button>
                    </div>
                    <div className="options-row">
                        <button className="option" disabled={selectedOption || countDown <= 0} onClick={() => handleSelectOption("option3")} style={selectedOption === "option3" ? optionStyle : {}}>{currentQuestion?.option3}</button>
                        <button className="option" disabled={selectedOption || countDown <= 0} onClick={() => handleSelectOption("option4")} style={selectedOption === "option4" ? optionStyle : {}}>{currentQuestion?.option4}</button>
                    </div>
                </LoaderContainer>
            </div>
            <Countdown current={countDown} />
            <div className="stats">
                <div>
                    Corrects: <span>{correctQuestions}</span>
                </div>
                <div>
                    <span>{questionNumber}/{questions.length}</span>
                </div>
            </div>
        </div>
    )
}

export default GamePage