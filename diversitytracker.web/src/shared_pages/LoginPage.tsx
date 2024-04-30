import { Logout, useClientPrincipal } from '@aaronpowell/react-static-web-apps-auth';
import { CustomAnchor } from '../components/CustomAnchor'
import { ChartIcon } from '../resources/icons/ChartIcon'
import { FormIcon } from '../resources/icons/FormIcon'
import './LoginPage.css'
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export const LoginPage = () => {
    
    return(
        <header className="App-header">
            <section className="App-header__login">
            <h2>DataSense</h2>
            <Button>
                <Logout />
            </Button>
            </section>
        </header>
    )
}