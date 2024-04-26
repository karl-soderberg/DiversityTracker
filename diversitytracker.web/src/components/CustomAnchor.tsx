import { ReactElement } from 'react'
import './CustomAnchor.css'

type Props = {
    className: string,
    value: string,
    icon: ReactElement,
    width: string,
    height: string,
}

export const CustomAnchor = ( {className, value, icon, width, height} : Props) => {

    return(
        <a 
            className= {className}
            style={{width: width, height: height}}

        >
            
            {icon}
            <p className={`${className}__title`}>{value}</p>
        </a>
    )
}