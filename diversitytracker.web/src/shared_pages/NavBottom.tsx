import { CustomAnchor } from '../components/CustomAnchor'
import { ChartIcon } from '../resources/icons/ChartIcon'
import { FormIcon } from '../resources/icons/FormIcon'
import './NavBottom.css'

type Props = {
    page: string,
    setPage: (page: string) => void
}

export const NavBottom = ({ setPage, page }: Props) => {
    return(
        <nav className='navbottom-container'>
            <CustomAnchor 
                className='navbottom__item'
                value='charts view'
                icon={<ChartIcon className='navbottom__icon' width='30px'/>}
                width=''
                height='100%'
                link='#'
                active={page == 'ChartPage' ? true : false}
                click={() => setPage('ChartPage')}
            />
            <CustomAnchor 
                className='navbottom__item'
                value='form'
                icon={<FormIcon className='navbottom__icon' width='25px'/>}
                width=''
                height='100%'
                link='#'
                active={page == 'FormPage' ? true : false}
                click={() => setPage('FormPage')}
            />
            <CustomAnchor 
                className='navbottom__item'
                value='Newform'
                icon={<FormIcon className='navbottom__icon' width='25px'/>}
                width=''
                height='100%'
                link='#'
                active={page == 'NewFormPage' ? true : false}
                click={() => setPage('NewFormPage')}
            />
        </nav>
    )
}