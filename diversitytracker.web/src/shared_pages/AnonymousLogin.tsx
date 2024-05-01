import { useClientPrincipal } from '@aaronpowell/react-static-web-apps-auth';
import { CustomAnchor } from '../components/CustomAnchor'
import { ChartIcon } from '../resources/icons/ChartIcon'
import { FormIcon } from '../resources/icons/FormIcon'
import './AnonymousLogin.css'
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export const AnonymousLogin = () => {
    
    return(
        <section className='anonymouspagesign-container'>
            <img src="https://res.cloudinary.com/dlw9fdrql/image/upload/v1714415047/office_tracker_logo_konca1.png" alt="" />
            <h2>OFFICE TRACKER</h2>
            <p>HARMONIZING THE INTEPERSONAL WORKSPACE</p>
            {/* <Button className='anonymouspagesign__btn'>Begin</Button> */}
            <Link to="/anonymousform" className='anonymouspagesign__btn'>Begin</Link>
        </section>
    )
}