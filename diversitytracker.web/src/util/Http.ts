const API_URL = import.meta.env.VITE_API_URL;

export const GetAllQuestions = async () => {
    const response = await fetch(`${API_URL}/Questions`);

    if (!response.ok) {
        const error = new Error('An error occurred while fetching questions');
        error.message = await response.json();
        throw error;
    }

    const questions = await response.json();

    return questions;
}