import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export const NotFoundPage = () => {
    
    return(
        <article className="notfound-container">
          <Link to="/" className='anonymouspagesign__btn'>I don't like my job and I don't think I'm gonna go</Link>
        </article>
    )
}