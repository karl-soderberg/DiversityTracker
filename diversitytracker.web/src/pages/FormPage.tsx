import { CustomSlider } from '../components/CustomSlider'
import './FormPage.css'

type Props = {
    className: string
}

export const FormPage = ( {className} : Props) => {

    return(
        <section className={className}>
            <h1>Forms Page</h1>
            <p>Submit your form</p>
            <form className='formpage-container__form'>
                <CustomSlider 
                    min={0}
                    max={100}
                    step={.1}
                    onChange={(value) => console.log(value)}
                />
                <CustomSlider 
                    min={0}
                    max={100}
                    step={.1}
                    onChange={(value) => console.log(value)}
                />
                <CustomSlider 
                    min={0}
                    max={100}
                    step={.1}
                    onChange={(value) => console.log(value)}
                />
                <button 
                    className='btn-primary--gradient-outline form-input__buttonlogin'
                    type='button'
                >
                Submit</button>
                </form>
        </section>
    )
}