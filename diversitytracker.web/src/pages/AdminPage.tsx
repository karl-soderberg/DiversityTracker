import { useEffect, useState } from 'react'
import './AdminPage.css'
import { GetAllQuestions } from '../util/Http'
import { Question } from '../types/types'
import { useQuery } from 'react-query'

type Props = {
    className: string
}

export const AdminPage = ( {className} : Props) => {
    const { data, isLoading, isError, error, refetch } = useQuery<Array<Question>, Error>({
        queryKey: ['query'],
        queryFn: () => GetAllQuestions()
    });

    return(
        <section className={className}>
            <h1>Admin Page</h1>
            <article>
                <h2>FormData Questions</h2>
                <ul>
                {isLoading && 'Loading...'}

                {isError && 'Unknown Error occured...'}

                {data && 
                    data.map((question) => (
                        <li key={question.id}>{question.value}</li>
                    ))
                }
                </ul>
            </article>
        </section>
    )
}