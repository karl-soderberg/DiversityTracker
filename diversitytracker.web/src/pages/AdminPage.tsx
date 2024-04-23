import { FormEvent, useEffect, useState } from 'react'
import './AdminPage.css'
import { GetAllQuestions } from '../util/Http'
import { Question } from '../types/types'
import { useQuery } from 'react-query'

type Props = {
    className: string
}

export const AdminPage = ( {className} : Props) => {
    const [btnsVisible, setBtnsVisible] = useState<string>('');

    const submitHandler = (e: FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        // deleteDeveloper(e.currentTarget.value);
    };

    const { data, isLoading, isError, error, refetch } = useQuery<Array<Question>, Error>({
        queryKey: ['query'],
        queryFn: () => GetAllQuestions()
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
            </article>
        </section>
    )
}