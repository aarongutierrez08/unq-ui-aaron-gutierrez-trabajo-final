import axios from 'axios';

const BASE_URL = 'https://preguntados-api.vercel.app'

export const formatAxiosErrorMsg = (error) => {
    return { error: error.response.data.error + ": try to play later" }
}

export const getDifficulty = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/difficulty`)
        return response.data
    } catch (error) {
        throw error?.response ? formatAxiosErrorMsg(error) : { error: 'An error has occurred'}
    }
}

export const getQuestionsByDifficulty = async ({ difficulty }) => {
    try {
        const difficultyQueryParam = difficulty ? `?difficulty=${difficulty}` : ''
        const response = await axios.get(`${BASE_URL}/api/questions${difficultyQueryParam}`)
        return response.data
    } catch (error) {
        throw error?.response ? formatAxiosErrorMsg(error) : { error: 'An error has occurred'}
    }
}

export const answerQuestion = async ({ questionId, option }) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/answer`, { questionId, option })
        return response.data
    } catch (error) {
        throw error?.response ? formatAxiosErrorMsg(error) : { error: 'An error has occurred'}
    }
}