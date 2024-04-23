import { useQuery } from 'react-query'
import { CustomSlider } from '../components/CustomSlider'
import { Question } from '../types/types'
import { GetAllQuestions } from '../util/Http'
import './FormPage.css'

type Props = {
    className: string
}

export const FormPage = ( {className} : Props) => {
    const { data, isLoading, isError, error, refetch } = useQuery<Array<Question>, Error>({
        queryKey: ['query'],
        queryFn: () => GetAllQuestions()
    });

    return(
        <section className={className}>
            <h1>Forms Page</h1>
            <p>Submit your form</p>
            <form className='formpage-container__form'>
                {isLoading && 'Loading...'}

                {isError && 'Unknown Error occured...'}


                {data && 
                    data.map((question) => (
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