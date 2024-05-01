import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export const NotFoundPage = () => {
    
    return(
        <article className="notfound-container">
          <Link to="/" className='anonymouspagesign__btn'>404 where's my memo</Link>
        </article>
    )
}