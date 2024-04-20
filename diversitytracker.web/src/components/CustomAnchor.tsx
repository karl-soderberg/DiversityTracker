type Props = {
    className: string,
    value: string,
    icon: string,
    width: string,
    link: string,
}

export const CustomAnchor = ( {className, value, icon, width, link} : Props) => {

    return(
        <a 
            className={className}
            href={link}
        >
            {value}
            <img src={icon} style={{width: width, height: width}} alt="" />
        </a>
    )
}