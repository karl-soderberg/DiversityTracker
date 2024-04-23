import './AdminPage.css'

type Props = {
    className: string
}

export const AdminPage = ( {className} : Props) => {

    return(
        <section className={className}>
            <h1>Admin Page</h1>
            <article>
                <h2>FormData Questions</h2>
                <ul>
                    <li>question1</li>
                </ul>
            </article>
        </section>
    )
}