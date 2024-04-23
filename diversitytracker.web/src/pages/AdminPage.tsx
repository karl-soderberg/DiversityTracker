import './AdminPage.css'

type Props = {
    className: string
}

export const AdminPage = ( {className} : Props) => {

    return(
        <section className={className}>
            <h1>Admin Page</h1>
        </section>
    )
}