import './FormPage.css'

type Props = {
    className: string
}

export const FormPage = ( {className} : Props) => {

    return(
        <section className={className}>
            <h1>Charts Page</h1>
            <p>Something about charts</p>
        </section>
    )
}