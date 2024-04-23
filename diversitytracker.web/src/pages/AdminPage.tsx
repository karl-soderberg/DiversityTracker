import { useEffect, useState } from 'react'
import './AdminPage.css'
import { GetAllQuestions } from '../util/Http'
import { Question } from '../types/types'

type Props = {
    className: string
}

export const AdminPage = ( {className} : Props) => {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedQuestions = await GetAllQuestions();
            setQuestions(fetchedQuestions);
        };

        fetchData();
    }, []);

    return(
        <section className={className}>
            <h1>Admin Page</h1>
            <article>
                <h2>FormData Questions</h2>
                <ul>
                    {questions && 
                        questions.map((question) => (
                            <li>{question.value}</li>
                        ))
                    }
                </ul>
            </article>
        </section>
    )
}