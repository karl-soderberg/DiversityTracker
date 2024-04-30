import { Logout, useClientPrincipal } from '@aaronpowell/react-static-web-apps-auth';
import { CustomAnchor } from '../components/CustomAnchor'
import { ChartIcon } from '../resources/icons/ChartIcon'
import { FormIcon } from '../resources/icons/FormIcon'
import './LoginPage.css'
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export const LoginPage = () => {
    
    return(
        <header className='anonymouspagesign-container App-header'>
            <img src="https://res.cloudinary.com/dlw9fdrql/image/upload/v1714415047/office_tracker_logo_konca1.png" alt="" />
            <h2>OFFICE TRACKER</h2>
            <p>HARMONIZING THE INTEPERSONAL WORKSPACE</p>
            <Button className='anonymouspagesign__btn'>Begin</Button>
        </header>
    )
}