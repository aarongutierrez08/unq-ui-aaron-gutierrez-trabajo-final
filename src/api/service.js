import axios from 'axios';

const BASE_URL = 'https://preguntados-api.vercel.app'

export const getDifficulty = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/difficulty`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getQuestionsByDifficulty = async ({ difficulty }) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/questions?difficulty=${difficulty}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const answerQuestion = async ({ questionId, option }) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/answer`, { questionId, option })
        return response.data
    } catch (error) {
        throw error
    }
}