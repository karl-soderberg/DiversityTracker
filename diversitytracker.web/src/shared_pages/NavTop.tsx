import React, { useState } from 'react';
import { CustomAnchor } from '../components/CustomAnchor'
import { ChartIcon } from '../resources/icons/ChartIcon'
import { FormIcon } from '../resources/icons/FormIcon'
import './NavTop.css'
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { Logout } from '@aaronpowell/react-static-web-apps-auth';

type Props = {
    isAdmin: boolean
}

export const NavTop = ({isAdmin}: Props) => {
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false); 
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
                    <section className={'sidebar ' + (sidebarVisible && 'active')}>
                        <a className='btn'>My Account</a>
                        <a className='btn'>Admin Tab</a>
                        <a className='btn'>Form Preview</a>
                        <Button className='btn btn-logout'>
                            <Logout />      
                        </Button>
                    </section>
                    <a onClick={() => setSidebarVisible(!sidebarVisible)}>
                        {/* <svg width="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#DEDEDE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> */}
                        <div className='admin_icon'></div>
                    </a>
                </>
            }   
        </nav>
    )
}