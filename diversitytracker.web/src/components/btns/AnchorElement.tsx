type Props = {
    className: string
    svgContent: JSX.Element
    onActivate: () => void
}

export const AnchorElement = ({className, svgContent, onActivate}: Props) => {
    return (
        <div className={className}>
            <a
                onClick={() => {
                    onActivate();
                }}
            >
                {svgContent}
            </a>
        </div>
    )
}