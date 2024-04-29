import { APIFormsResponse, PostFormSubmissionDto, PostQuestionTypeDto, Question } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL;

export const GetAllQuestions = async (): Promise<Array<Question>> => {
    const response = await fetch(`${API_URL}/Questions`);

    if (!response.ok) {
        const error = new Error('An error occurred while fetching questions');
        error.message = await response.json();
        throw error;
    }

    const questions = await response.json();

    return questions;
}

export const DeleteQuestion = async (question: string): Promise<void> => {
    const response = await fetch(`${API_URL}/Questions/${question}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = new Error('An error occurred while deleting the new question');
        error.message = await response.json();
        throw error;
    }
}

export const PutQuestion = async (question: Question): Promise<void> => {
    const putQuestionType: PostQuestionTypeDto = {
        value: question.value
    }
    const response = await fetch(`${API_URL}/Questions/${question.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(putQuestionType),
    });

    if (!response.ok) {
        const error = new Error('An error occurred while deleting the new question');
        error.message = await response.json();
        throw error;
    }
}

export const PostQuestion = async (question: string) => {
    const newQuestion: PostQuestionTypeDto = {
        value: question
    }
    const response = await fetch(`${API_URL}/Questions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
    });

    if (!response.ok) {
        const error = new Error('An error occurred while posting the new question');
        error.message = await response.json();
        throw error;
    }

    const newQuestionResponse = await response.json();
    console.log(newQuestionResponse);
    return newQuestionResponse;
}


export const PostFormsData = async (postFormSubmissionDto: PostFormSubmissionDto) => {
    console.log(postFormSubmissionDto);
    const response = await fetch(`${API_URL}/FormsData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postFormSubmissionDto),
    });

    if (!response.ok) {
        const error = new Error('An error occurred while posting the new question');
        error.message = await response.json();
        throw error;
    }

    const newFormsDataResponse = await response.json();
    console.log(newFormsDataResponse);
    return newFormsDataResponse;
}



export const GetFormsData = async () => {
    const response = await fetch(`${API_URL}/FormsData`);

    if (!response.ok) {
        const error = new Error('An error occurred while fetching Forms');
        error.message = await response.json();
        throw error;
    }

    const formsResponse = await response.json();

    return formsResponse;
}


export const aiInterperetAllReflectionsForms = async () => {
    const response = await fetch(`${API_URL}/AiInterpretation/InterperetAllReflectionsForms`);

    if (!response.ok) {
        const error = new Error('An error occurred while processing the request');
        error.message = await response.json();
        throw error;
    }

    const jsonResponse = await response.json();

    return jsonResponse;
}

export const aiInterperetAllRealData = async () => {
    console.log("starting!");
    const response = await fetch(`${API_URL}/AiInterpretation/InterperetAllRealData`);

    if (!response.ok) {
        const error = new Error('An error occurred while processing the request');
        error.message = await response.json();
        throw error;
    }

    const jsonResponse = await response.json();

    return jsonResponse;
}

export const aiInterperetAllQuestionAnswers = async () => {
    const response = await fetch(`${API_URL}/AiInterpretation/InterperetAllQuestionAnswers`);

    if (!response.ok) {
        const error = new Error('An error occurred while processing the request');
        error.message = await response.json();
        throw error;
    }

    const jsonResponse = await response.json();

    return jsonResponse;
}

export const aiInterperetAllQuestionValues = async () => {
    const response = await fetch(`${API_URL}/AiInterpretation/InterperetAllQuestionValues`);

    if (!response.ok) {
        const error = new Error('An error occurred while processing the request');
        error.message = await response.json();
        throw error;
    }

    const jsonResponse = await response.json();

    return jsonResponse;
}

export const aiCreateDataFromQuestionAnswersInterpretation = async () => {
    const response = await fetch(`${API_URL}/AiInterpretation/CreateDataFromQuestionAnswersInterpretation`);

    if (!response.ok) {
        const error = new Error('An error occurred while processing the request');
        error.message = await response.json();
        throw error;
    }

    const jsonResponse = await response.json();

    return jsonResponse;
}