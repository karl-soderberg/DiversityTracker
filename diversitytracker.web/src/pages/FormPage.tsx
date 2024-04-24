import { useQuery } from 'react-query'
import { CustomSlider } from '../components/CustomSlider'
import { Question } from '../types/types'
import { GetAllQuestions } from '../util/Http'
import './FormPage.css'

type Props = {
    className: string,
    questionData: any, 
    isLoading: any, 
    isError: any, 
    error: any, 
    refetch: any
}

export const FormPage = ( {className, questionData, isLoading, isError, error, refetch} : Props) => {

    return(
        <section className={className}>
            <h1>Forms Page</h1>
            <p>Submit your form</p>
            <form className='formpage-container__form'>
                {isLoading && 'Loading...'}

                {isError && 'Unknown Error occured...'}

                {questionData && 
                    questionData.map((question) => (
                        <CustomSlider 
                            min={0}
                            max={100}
                            step={.1}
                            onChange={(value) => console.log(value)}
                            text={question.value}
                            key={question.id}
                        />
                    ))
                }

                <button 
                    className='btn-primary--gradient-outline form-input__buttonlogin'
                    type='button'
                >
                Submit</button>
                </form>
        </section>
    )
}