type Props = {
    className: string
}

export const Footer = ({className}: Props) => {
    return(
        <footer className={className}>
            <img src="https://res.cloudinary.com/dlw9fdrql/image/upload/v1714415047/office_tracker_logo_konca1.png" alt="" />
            <h2>OFFICE TRACKER</h2>
            <p>HARMONIZING THE INTEPERSONAL WORKSPACE</p>
        </footer>
    )
}