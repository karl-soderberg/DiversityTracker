import { motion } from 'framer-motion';
type Props = {
    data: any
    dynamicAttribute: string
    className: string
    title: string
    noDataTitle: string
    noDatabtnTitle: string
    activeQuestion: string
    noDataBtnTrigger: () => void
}

export const ArticleAnimated = ({data, dynamicAttribute, className, title, noDataTitle, noDatabtnTitle, activeQuestion, noDataBtnTrigger}: Props) => {
    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className={className}
            >
            <h2>{title}</h2>
                <>
                    {data.aiInterpretation.questionInterpretations.filter(inter => inter.questionTypeId === activeQuestion).length > 0 ? (
                        data.aiInterpretation.questionInterpretations.filter(inter => inter.questionTypeId === activeQuestion).map(filteredInter => (
                        <motion.p key={filteredInter.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                            {filteredInter[dynamicAttribute]}
                        </motion.p>
                        ))
                    ) : (
                        <>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>No answers available.</motion.p>
                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => noDataBtnTrigger()}>
                            Interpret data
                        </motion.button>
                        </>
                    )}
                </>
        </motion.article>
    )
}