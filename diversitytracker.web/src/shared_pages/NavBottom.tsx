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
                active={page == 'chart-home' ? true : false}
                click={() => setPage('chart-home')}
            />
            <CustomAnchor 
                className='navbottom__item'
                value='form'
                icon={<FormIcon className='navbottom__icon' width='25px'/>}
                width=''
                height='100%'
                link='#'
                active={page == 'form-page' ? true : false}
                click={() => setPage('form-page')}
            />
        </nav>
    )
}