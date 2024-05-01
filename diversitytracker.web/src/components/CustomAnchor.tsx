import { ReactElement } from 'react'
import './CustomAnchor.css'

type Props = {
    className: string,
    value: string,
    icon: ReactElement,
    width: string,
    height: string,
    active: string,
}

export const CustomAnchor = ( {className, value, icon, width, height, active} : Props) => {

    return(
        <a 
            className= {className + " " + active}
            style={{width: width, height: height}}

        >
            
            {icon}
            <p className={`${className}__title`}>{value}</p>
        </a>
    )
}