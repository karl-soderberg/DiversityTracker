import { FormEvent, useEffect, useState } from 'react'
import './AdminPage.css'
import { DeleteQuestion, GetAllQuestions, PostQuestion, PutQuestion } from '../util/Http'
import { PostQuestionTypeDto, Question } from '../types/types'
import { useMutation, useQuery } from 'react-query'
import { motion } from 'framer-motion';

type Props = {
    className: string,
    questionData: any, 
    isLoading: any, 
    isError: any, 
    error: any, 
    refetch: any
}

export const AdminPage = ( {className, questionData, isLoading, isError, error, refetch} : Props) => {
    const [btnsVisible, setBtnsVisible] = useState<string>('');
    const [modifyOn, setModifyOn] = useState<string>('');
    const [modifyActive, setModifyActive] = useState<boolean>(false);
    const [modifyValue, setModifyValue] = useState<string>('');
    const [addQuestionValue, setAddQuestionValue] = useState<string>('');
    const [deleteConfirmationWindow, setDeleteConfirmationWindow] = useState<boolean>(false);
    const [deleteQuestionId, setDeleteQuestionId] = useState<string>('');

    const addQuestionHandler = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // const questionValue = e.target.question.value;
        const questionValue = addQuestionValue;
        if(questionValue != ''){
            postQuestion.mutate(questionValue);
        }
    }

    const modifyHandler = (id: string, value: string) => {
        setModifyOn(id); 
        setModifyActive(true)
        setModifyValue(value);
    }

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
            <h1 className={className + '__title'}>Admin Page</h1>
            <p className={className + '__subtitle'}>Salt Organization</p>
            <article className='formdata__questions-container'>
                <h2 className='formdata__questions-header'>FormData Questions</h2>
                <ul className='formdata__questions-list'>
                {isLoading && 'Loading...'}

                {isError && 'Unknown Error occured...'}

                {questionData && 
                    questionData.map((question) => (
                        <motion.li 
                            key={question.id}
                            onMouseEnter={() => {
                                if(!modifyActive){
                                    setBtnsVisible(question.id);
                                }
                            }}
                            className='formdata__questions--question'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ 
                                duration: .8,
                                ease: "easeInOut"
                            }}
                        >
                            {modifyOn !== question.id && question.value}
                            <button 
                                className={`formdata__questions__button-delete ${btnsVisible === question.id && !modifyActive && 'active'}`}
                                name="developer" 
                                value={question.id}
                                onClick={() => {
                                    setDeleteConfirmationWindow(true); 
                                    setDeleteQuestionId(question.id);
                                }}
                            >
                                <svg width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3L21 21M18 6L17.6 12M17.2498 17.2527L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6H4M16 6L15.4559 4.36754C15.1837 3.55086 14.4194 3 13.5585 3H10.4416C9.94243 3 9.47576 3.18519 9.11865 3.5M11.6133 6H20M14 14V17M10 10V17" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>  
                            </button>
                            <button 
                                className={`formdata__questions__button-modify ${btnsVisible === question.id && 'active'}`}
                                name="developer" 
                                value={question.id}   
                                onClick={() => {
                                    if(modifyActive){
                                        if(modifyValue !== question.value){
                                            putQuestion.mutate({id: question.id, value: modifyValue});
                                        }
                                        setModifyActive(false);
                                        setModifyOn('');
                                    } else {
                                        modifyHandler(question.id, question.value);
                                    }
                                }}
                            >
                                {modifyActive ? 
                                <svg className='modifyicon active' width="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" >
                                    <path d="M0 0h48v48H0z" fill="none"/>
                                    <g id="Shopicon">
                                        <path fill='#fff' d="M8.706,37.027c2.363-0.585,4.798-1.243,6.545-1.243c0.683,0,1.261,0.101,1.688,0.345c1.474,0.845,2.318,4.268,3.245,7.502
                                            C21.421,43.866,22.694,44,24,44c1.306,0,2.579-0.134,3.816-0.368c0.926-3.234,1.771-6.657,3.244-7.501
                                            c0.427-0.245,1.005-0.345,1.688-0.345c1.747,0,4.183,0.658,6.545,1.243c1.605-1.848,2.865-3.99,3.706-6.333
                                            c-2.344-2.406-4.872-4.891-4.872-6.694c0-1.804,2.528-4.288,4.872-6.694c-0.841-2.343-2.101-4.485-3.706-6.333
                                            c-2.363,0.585-4.798,1.243-6.545,1.243c-0.683,0-1.261-0.101-1.688-0.345c-1.474-0.845-2.318-4.268-3.245-7.502
                                            C26.579,4.134,25.306,4,24,4c-1.306,0-2.579,0.134-3.816,0.368c-0.926,3.234-1.771,6.657-3.245,7.501
                                            c-0.427,0.245-1.005,0.345-1.688,0.345c-1.747,0-4.183-0.658-6.545-1.243C7.101,12.821,5.841,14.962,5,17.306
                                            C7.344,19.712,9.872,22.196,9.872,24c0,1.804-2.527,4.288-4.872,6.694C5.841,33.037,7.101,35.179,8.706,37.027z M18,24
                                            c0-3.314,2.686-6,6-6s6,2.686,6,6s-2.686,6-6,6S18,27.314,18,24z"/>
                                    </g>
                                </svg>
                            : 
                                <svg className='modifyicon' width="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" >
                                    <path d="M0 0h48v48H0z" fill="none"/>
                                    <g id="Shopicon">
                                        <path fill='#fff' d="M8.706,37.027c2.363-0.585,4.798-1.243,6.545-1.243c0.683,0,1.261,0.101,1.688,0.345c1.474,0.845,2.318,4.268,3.245,7.502
                                            C21.421,43.866,22.694,44,24,44c1.306,0,2.579-0.134,3.816-0.368c0.926-3.234,1.771-6.657,3.244-7.501
                                            c0.427-0.245,1.005-0.345,1.688-0.345c1.747,0,4.183,0.658,6.545,1.243c1.605-1.848,2.865-3.99,3.706-6.333
                                            c-2.344-2.406-4.872-4.891-4.872-6.694c0-1.804,2.528-4.288,4.872-6.694c-0.841-2.343-2.101-4.485-3.706-6.333
                                            c-2.363,0.585-4.798,1.243-6.545,1.243c-0.683,0-1.261-0.101-1.688-0.345c-1.474-0.845-2.318-4.268-3.245-7.502
                                            C26.579,4.134,25.306,4,24,4c-1.306,0-2.579,0.134-3.816,0.368c-0.926,3.234-1.771,6.657-3.245,7.501
                                            c-0.427,0.245-1.005,0.345-1.688,0.345c-1.747,0-4.183-0.658-6.545-1.243C7.101,12.821,5.841,14.962,5,17.306
                                            C7.344,19.712,9.872,22.196,9.872,24c0,1.804-2.527,4.288-4.872,6.694C5.841,33.037,7.101,35.179,8.706,37.027z M18,24
                                            c0-3.314,2.686-6,6-6s6,2.686,6,6s-2.686,6-6,6S18,27.314,18,24z"/>
                                    </g>
                                </svg>
                            }
                            </button>
                            <input 
                                className={`formdata__questions__modify ${modifyOn === question.id && 'active'}`} 
                                type="text" 
                                value={modifyActive ? modifyValue : question.value}
                                onChange={(e) => setModifyValue(e.target.value)}
                            />
                        </motion.li>
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