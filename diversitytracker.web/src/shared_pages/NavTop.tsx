import React, { useState } from 'react';
import { CustomAnchor } from '../components/CustomAnchor'
import { ChartIcon } from '../resources/icons/ChartIcon'
import { FormIcon } from '../resources/icons/FormIcon'
import './NavTop.css'
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { Logout, useClientPrincipal } from '@aaronpowell/react-static-web-apps-auth';

type Props = {
    isAdmin: boolean
}

export const NavTop = () => {
    const { clientPrincipal } = useClientPrincipal();
    const isAdmin = clientPrincipal?.userRoles.includes('admin');
    // const isAdmin = true;
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false); 

    const location = useLocation();
    const isChartPage = location.pathname === '/chart';

    return(
        <nav className={'navtop-container'}>
            <a>
                <svg className='navtop__icon' width="25px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <g data-name="arrow left" id="arrow_left">
                        <path fill='#DEDEDE' d="M22,29.73a1,1,0,0,1-.71-.29L9.93,18.12a3,3,0,0,1,0-4.24L21.24,2.56A1,1,0,1,1,22.66,4L11.34,15.29a1,1,0,0,0,0,1.42L22.66,28a1,1,0,0,1,0,1.42A1,1,0,0,1,22,29.73Z"/>
                    </g>
                </svg>
            </a>
            {isAdmin && 
                <>
                    <section className={'sidebar ' + (sidebarVisible && 'active ') + (isChartPage && 'darkmode')}>
                        <Link onClick={() => setSidebarVisible(false)} to="admin" className='btn'>My Account</Link>
                        <Link onClick={() => setSidebarVisible(false)} to="admin" className='btn'>Admin Tab</Link>
                        <Link onClick={() => setSidebarVisible(false)} to="/" className='btn'>Form Preview</Link>
                        <Button className='btn btn-logout'>
                            <Logout />      
                        </Button>
                    </section>
                    <a onClick={() => setSidebarVisible(!sidebarVisible)}>
                        <div className='admin_icon'></div>
                    </a>
                </>
            }   
        </nav>
    )
}