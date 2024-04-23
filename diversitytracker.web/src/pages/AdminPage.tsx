import { FormEvent, useEffect, useState } from 'react'
import './AdminPage.css'
import { DeleteQuestion, GetAllQuestions, PostQuestion, PutQuestion } from '../util/Http'
import { PostQuestionTypeDto, Question } from '../types/types'
import { useMutation, useQuery } from 'react-query'

type Props = {
    className: string
}

export const AdminPage = ( {className} : Props) => {
    const [btnsVisible, setBtnsVisible] = useState<string>('');
    const [modifyOn, setModifyOn] = useState<string>('');
    const [modifyActive, setModifyActive] = useState<boolean>(false);
    const [modifyValue, setModifyValue] = useState<string>('');
    const [addQuestionValue, setAddQuestionValue] = useState<string>('');
    const [deleteConfirmationWindow, setDeleteConfirmationWindow] = useState<boolean>(false);
    const [deleteQuestionId, setDeleteQuestionId] = useState<string>('');

    const addQuestionHandler = (e: FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const questionValue = e.target.question.value;
        if(questionValue != ''){
            postQuestion.mutate(questionValue);
        }
    }

    const modifyHandler = (id: string, value: string) => {
        setModifyOn(id); 
        setModifyActive(true)
        setModifyValue(value);
    }

    const { data, isLoading, isError, error, refetch } = useQuery<Array<Question>, Error>({
        queryKey: ['query'],
        queryFn: () => GetAllQuestions()
    });

    const postQuestion = useMutation((question: string) => PostQuestion(question), {
        onSuccess: () => {
            refetch();
        }
    });

    const putQuestion = useMutation((question: Question) => PutQuestion(question), {
        onSuccess: () => {
            refetch();
        }
    });

    const deleteQuestion = useMutation((question: string) => DeleteQuestion(question), {
        onSuccess: () => {
            refetch();
        }
    });

    return(
        <section className={className}>
            <h1>Admin Page</h1>
            <article className='formdata__questions-container'>
                <h2 className='formdata__questions-header'>FormData Questions</h2>
                <ul className='formdata__questions-list'>
                {isLoading && 'Loading...'}

                {isError && 'Unknown Error occured...'}

                {data && 
                    data.map((question) => (
                        <li onMouseEnter={() => {
                                if(modifyActive != true){
                                    setBtnsVisible(question.id)
                                }
                            }}  
                            className='formdata__questions--question' key={question.id}>
                            {modifyOn != question.id && question.value}
                            <button className={'formdata__questions__button-delete ' + ((btnsVisible == question.id && modifyActive == false) && 'active')} 
                                name="developer" 
                                value={question.id}
                                onClick={() => {setDeleteConfirmationWindow(true); setDeleteQuestionId(question.id)}}
                            >
                            Delete</button>
                            <button className={'formdata__questions__button-modify ' + ((btnsVisible == question.id) && 'active')}
                                name="developer" 
                                value={question.id}   
                                onClick={() => {
                                    if(modifyActive == true){
                                        if(modifyValue != question.value)
                                        {
                                            putQuestion.mutate({id: question.id, value: modifyValue});
                                        }
                                        setModifyActive(false);
                                        setModifyOn('');
                                    }
                                    else{
                                        modifyHandler(question.id, question.value)
                                    }
                                }}
                            >
                            {modifyActive ? 'Apply' : 'Modify'}
                            </button>
                            <input 
                                className={'formdata__questions__modify ' + (modifyOn == question.id && 'active')} 
                                type="text" 
                                value={modifyActive ? modifyValue : question.value}
                                onChange={(e) => setModifyValue(e.target.value)}
                            />
                        </li>
                    ))
                }
                </ul>
                <form className='formdata__questions_addform' onSubmit={(e) => {addQuestionHandler(e); setAddQuestionValue('')}} action="submit">
                    <input 
                        name='question' 
                        type="text" 
                        placeholder='New Question' 
                        className='formdata__questions_addform-input' 
                        onChange={(e) => setAddQuestionValue(e.target.value)}
                        value={addQuestionValue}
                    />
                    <button className='formdata__questions_addform-btn'>+</button>
                </form>
                {deleteConfirmationWindow &&
                    <div className='deleteconfirmation-container'>
                        <h2>This action will <span>delete</span> the question in <span>all the forms associated with it!</span></h2>
                        <button className={'formdata__questions__button-delete active'} 
                            name="developer" 
                            onClick={() => {deleteQuestion.mutate(deleteQuestionId); setDeleteConfirmationWindow(false)}}
                        >
                        Yes Delete</button>
                        <button className={'formdata__questions__button-modify active'} 
                            name="developer" 
                            onClick={() => setDeleteConfirmationWindow(false)}
                        >
                        Go Back</button>
                    </div>
                }
            </article>
        </section>
    )
}