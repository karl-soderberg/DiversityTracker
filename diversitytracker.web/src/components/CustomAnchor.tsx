import { ReactElement } from 'react'
import './CustomAnchor.css'

type Props = {
    className: string,
    value: string,
    icon: ReactElement,
    width: string,
    height: string,
    link: string,
    click: () => void,
    active: boolean
}

export const CustomAnchor = ( {className, value, icon, width, height, link, click, active} : Props) => {

    return(
        <a 
            className={`${className} ` + (active && 'active')}
            style={{width: width, height: height}}
            href={link}
            onClick={() => click()}
        >
            
            {icon}
            <p className={`${className}__title`}>{value}</p>
        </a>
    )
}