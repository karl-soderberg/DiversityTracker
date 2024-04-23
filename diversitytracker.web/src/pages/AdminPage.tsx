import { FormEvent, useEffect, useState } from 'react'
import './AdminPage.css'
import { GetAllQuestions, PostQuestion } from '../util/Http'
import { Question } from '../types/types'
import { useMutation, useQuery } from 'react-query'

type Props = {
    className: string
}

export const AdminPage = ( {className} : Props) => {
    const [btnsVisible, setBtnsVisible] = useState<string>('');

    const deleteQuestionHandler = (id: string) => {
        
    };

    const addQuestionHandler = (e: FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const questionValue = e.target.question.value;
        if(questionValue != ''){
            
        }
    }

    const { data, isLoading, isError, error, refetch } = useQuery<Array<Question>, Error>({
        queryKey: ['query'],
        queryFn: () => GetAllQuestions()
    });

    const postQuestion = useMutation((question: Question) => PostQuestion(question), {
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
                        <li onMouseEnter={() => setBtnsVisible(question.id)}  className='formdata__questions--question' key={question.id}>{question.value}
                            <button className={'formdata__questions__button-delete ' + (btnsVisible == question.id && 'visible')} 
                                name="developer" 
                                value={question.id}
                                onClick={() => deleteQuestionHandler(question.id)}
                            >
                            Delete</button>
                            <button className={'formdata__questions__button-modify ' + (btnsVisible == question.id && 'visible')}
                                name="developer" 
                                value={question.id}   
                            >
                            Modify</button>
                        </li>
                    ))
                }
                </ul>
                <form onSubmit={() => addQuestionHandler} action="submit">
                    <input name='question' type="text" placeholder='New Question' className='tags-input' />
                    <button className=''>+</button>
                </form>
            </article>
        </section>
    )
}