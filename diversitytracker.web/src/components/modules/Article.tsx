type Props = {
    data: any
    datanullcheck: any
    className: string
    title: string
    noDataTitle: string
    noDatabtnTitle: string
    noDataBtnTrigger: () => void
}

export const Article = ({data, datanullcheck, className, title, noDataTitle, noDatabtnTitle, noDataBtnTrigger}: Props) => {
    return (
        <article className={className}>
            <h2>{title}</h2>
            {datanullcheck != null && data ? (
                <p>{data}</p>
            ) : (
                <>
                    <p>{noDataTitle}</p>
                    <button onClick={() => noDataBtnTrigger()}>{noDatabtnTitle}</button>
                </>
            )}
        </article>
    )
}