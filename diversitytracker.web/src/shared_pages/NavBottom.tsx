import { useClientPrincipal } from '@aaronpowell/react-static-web-apps-auth';
import { CustomAnchor } from '../components/CustomAnchor'
import { ChartIcon } from '../resources/icons/ChartIcon'
import { FormIcon } from '../resources/icons/FormIcon'
import './NavBottom.css'
import { Link, useLocation } from 'react-router-dom';

type Props = {
    isAdmin: boolean
}

export const NavBottom = () => {
    const { clientPrincipal } = useClientPrincipal();
    // const isAdmin = clientPrincipal?.userRoles.includes('admin');
    const isAdmin = true;

    const location = useLocation();

    const isChartPage = location.pathname === '/chart';
    const isNewFormPage = location.pathname === '/newform';
    const isAdminPage = location.pathname === '/admin';
    const isHomePage = location.pathname === '/'
    
    
    return(
        <nav className={'navbottom-container ' + (isChartPage && 'chartactive')}>
            {isAdmin && (
                <Link to="/chart">
                    <CustomAnchor 
                        className={'navb1 navbottom__item'}
                        value='Charts View'
                        icon={<ChartIcon className='navbottom__icon' width='30px'/>}
                        width=''
                        height='100%'
                        active={isChartPage ? 'active' : ''}
                    />
                </Link>
            )}
            <Link to="/">
                <CustomAnchor 
                    className={'navb2 navbottom__item'}
                    value='Form page'
                    icon={<FormIcon className='navbottom__icon' width='25px'/>}
                    width=''
                    height='100%'
                    active={(isNewFormPage || isHomePage) ? 'active' : ''}
                />
            </Link>
            {isAdmin && (
                <Link to="admin">
                    <CustomAnchor 
                        className={'navb3 navbottom__item'}
                        value='Admin Page'
                        icon={<ChartIcon className='navbottom__icon' width='30px'/>}
                        width=''
                        height='100%'
                        active={isAdminPage ? 'active' : ''}
                    />
                </Link>
            )}
        </nav>
    )
}