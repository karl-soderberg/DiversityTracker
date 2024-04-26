import { CustomAnchor } from '../components/CustomAnchor'
import { ChartIcon } from '../resources/icons/ChartIcon'
import { FormIcon } from '../resources/icons/FormIcon'
import './NavBottom.css'
import { Link } from 'react-router-dom';

export const NavBottom = () => {
    return(
        <nav className='navbottom-container'>
            <Link to="/chart">
                <CustomAnchor 
                    className='navbottom__item'
                    value='Charts View'
                    icon={<ChartIcon className='navbottom__icon' width='30px'/>}
                    width=''
                    height='100%'
                    
                />
            </Link>
            <Link to="/newform">
                <CustomAnchor 
                    className='navbottom__item'
                    value='Form page'
                    icon={<FormIcon className='navbottom__icon' width='25px'/>}
                    width=''
                    height='100%'
                />
            </Link>
            <Link to="admin">
                <CustomAnchor 
                    className='navbottom__item'
                    value='Admin Page'
                    icon={<ChartIcon className='navbottom__icon' width='30px'/>}
                    width=''
                    height='100%'
                />
            </Link>
        </nav>
    )
}