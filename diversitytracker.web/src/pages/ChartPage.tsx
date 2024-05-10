import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Label, Legend, Line, LineChart, Pie, PieChart, Rectangle, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts'
import './ChartPage.css'
import { useEffect, useState } from 'react'
import { MOCKData, barChartMockData } from '../data/MockData'
import { pieData, scatterFemaleData, scatterMaleData } from '../data/ProcessedData'
import { APIFormsResponse, ChartDistributionDict, ChartGenderDistribution, DistributionData, DistributionDataResponse, GenderDistribution, GenderValue, Question, scatterAiDataArr, scatterAiDataDict, scatterData, scatterDataArr, scatterDataDict } from '../types/types'
import { MapAPIFormsAIResponseToScatterChart, MapAPIFormsResponseToBarChart, MapAPIFormsResponseToDistributionDataType, MapAPIFormsResponseToGenderDistribution, MapAPIFormsResponseToScatterChart } from '../util/dataconversion'
import { Button, Switch } from 'antd'
import TextTransition, { presets } from 'react-text-transition'
import { motion } from 'framer-motion';
import { Footer } from '../shared_pages/Footer'
import { Article } from '../components/modules/Article'
import { DistributionChartModule } from '../components/charts/DistributionChartModule'
import { AreaChartModule } from '../components/charts/AreaChartModule'
import { PieChartModule } from '../components/charts/PieChartModule'
import { ScatterChartModule } from '../components/charts/ScatterChartModule'
import { BarChartModule } from '../components/charts/BarChartModule'

type Props = {
    className: string,
    questionData: any, 
    isLoading: any, 
    isError: any, 
    error: any, 
    refetch: any,
    formsData: APIFormsResponse,
    InterperetAllReflectionsForms: () => void,
    InterperetAllRealData: () => void,
    InterperetAllQuestionAnswers: () => void,
    InterperetAllQuestionValues: () => void,
    CreateDataFromQuestionAnswersInterpretation: () => void
}



export const ChartPage = ( {className, questionData, formsData, InterperetAllReflectionsForms, InterperetAllRealData, InterperetAllQuestionAnswers, InterperetAllQuestionValues, CreateDataFromQuestionAnswersInterpretation} : Props) => {
    const [chartType, setChartType] = useState<string>("distributionscale");
    const [scope, setScope] = useState<string>("both");
    
    const [questionsData, setQuestionsData] = useState<Array<Question>>();
    const [activeQuestion, setActiveQuestion] = useState<string>('');
    const [distributionformdata, setDistributionFormData] = useState<DistributionDataResponse>();
    const [genderDistributionData, setGenderDistributionData] = useState<GenderDistribution>();
    const [genderBarData, setGenderBarData] = useState<ChartDistributionDict>();
    const [timeAtCompanyScatterData, setTimeAtCompanyScatterData] = useState<scatterDataDict>();
    const [aiInterpretation, setAiInterpretation] = useState<scatterAiDataDict>();

    const [activeDistributionFormData, setActiveDistributionFormData] = useState<DistributionData>();
    const [activeGenderDistributionData, setActiveGenderDistributionData] = useState<Array<GenderValue>>();
    const [activeGenderBarData, setActiveGenderBarData] = useState<ChartGenderDistribution[]>();
    const [activeTimeAtCompanyScatterData, setActiveTimeAtCompanyScatterData] = useState<scatterDataArr>();
    const [activeAiInterpretation, setActiveAiInterpretation] = useState<scatterAiDataArr>();

    useEffect(() => {
        if (formsData && questionData && !activeQuestion) {
          setQuestionsData(questionData);
          setActiveQuestion(questionData[0].id);
        }
    
        if (formsData && questionData && !distributionformdata) {
          setDistributionFormData(MapAPIFormsResponseToDistributionDataType(formsData, questionData));
          setGenderDistributionData(MapAPIFormsResponseToGenderDistribution(formsData, questionData));
          setGenderBarData(MapAPIFormsResponseToBarChart(formsData, questionData));
          setTimeAtCompanyScatterData(MapAPIFormsResponseToScatterChart(formsData, questionData));
          formsData.aiInterpretation && setAiInterpretation(MapAPIFormsAIResponseToScatterChart(formsData, questionData));
        }
    
        if (activeQuestion) {
          distributionformdata && setActiveDistributionFormData(distributionformdata[activeQuestion]);
          genderDistributionData &&  setActiveGenderDistributionData(genderDistributionData[activeQuestion]);
          genderBarData &&  setActiveGenderBarData(genderBarData[activeQuestion]);
          timeAtCompanyScatterData &&  setActiveTimeAtCompanyScatterData(timeAtCompanyScatterData[activeQuestion]);
          aiInterpretation &&  setActiveAiInterpretation(aiInterpretation[activeQuestion]);
        }

      }, [formsData, questionData, activeQuestion, distributionformdata, genderDistributionData, genderBarData, timeAtCompanyScatterData, aiInterpretation]);

    const goToNextChart = () => {
        const currentIndex = questionData.findIndex(question => question.id === activeQuestion);
        if (currentIndex !== -1 && currentIndex < questionData.length - 1) {
            const nextIndex = currentIndex + 1;
            setActiveQuestion(questionData[nextIndex].id);
        }
    }

    const goToPreviousChart = () => {
        const currentIndex = questionData.findIndex(question => question.id === activeQuestion);
        if (currentIndex > 0) {
            const previousIndex = currentIndex - 1;
            setActiveQuestion(questionData[previousIndex].id);
        }
    }

    return(
        <section className={className}>
            <div className='chartpage-container--bg'></div>
            <div className='chartpage__selectquestion left'>
                <a
                    onClick={() => {
                        goToPreviousChart();
                    }}
                >
                    <svg width="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.88675 5.68247C7.49623 5.29195 6.86307 5.29195 6.47254 5.68247L1.58509 10.5747C0.804698 11.3559 0.805008 12.6217 1.58579 13.4024L6.47615 18.2928C6.86667 18.6833 7.49984 18.6833 7.89036 18.2928C8.28089 17.9023 8.28089 17.2691 7.89036 16.8786L3.70471 12.6929C3.31419 12.3024 3.31419 11.6692 3.70472 11.2787L7.88675 7.09669C8.27728 6.70616 8.27728 6.073 7.88675 5.68247Z" fill="#FFFFFFBD"/>
                    </svg>
                </a>
            </div>
            <div className='chartpage__selectquestion right'>
                <a
                    onClick={() => {
                        goToNextChart()
                    }}
                >
                    <svg width="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1359 18.2928C16.5264 18.6833 17.1596 18.6833 17.5501 18.2928L22.4375 13.4006C23.2179 12.6194 23.2176 11.3536 22.4369 10.5728L17.5465 5.68247C17.156 5.29195 16.5228 5.29195 16.1323 5.68247C15.7418 6.073 15.7418 6.70616 16.1323 7.09669L20.3179 11.2823C20.7085 11.6729 20.7085 12.306 20.3179 12.6965L16.1359 16.8786C15.7454 17.2691 15.7454 17.9023 16.1359 18.2928Z" fill="#FFFFFFBD"/>
                    </svg>
                </a>
            </div>
            <article className='chart-container'>
            {/* @ts-ignore */}
            <ResponsiveContainer width="90%" height="90%">
                {chartType === 'distributionscale' && activeDistributionFormData && distributionformdata ? (
                    <AreaChartModule 
                        data={activeDistributionFormData.data}
                        dataKeyA='numberofwomen'
                        dataKeyB='numberofmen'
                        scope={scope}
                        yLabel='Respondents'
                        xLabel='Satisfaction Level'
                        colorA='var(--chart-female)'
                        colorB='var( --chart-male)'
                    />
                ) : chartType === 'distributionacrosstime' ? (
                    <DistributionChartModule 
                        data={MOCKData}
                        dataKeyA='numberofwomen'
                        dataKeyB='numberofmen'
                        scope={scope}
                        colorA='var(--chart-female)'
                        colorB='var( --chart-male)'
                        yLabel='Satisfaction'
                        xLabel='Month'
                    />
                ) : chartType === 'genderdistribution' && genderDistributionData && activeGenderDistributionData ? (
                    <PieChartModule 
                        data={activeGenderDistributionData}
                        labelA='Gender Distribution'
                    />
                ) : chartType === 'scatterdistribution' && activeTimeAtCompanyScatterData && timeAtCompanyScatterData ? (
                        <ScatterChartModule 
                            dataA={activeTimeAtCompanyScatterData.scatterMaleData}
                            dataB={activeTimeAtCompanyScatterData.scatterFemaleData}
                            dataKeyA='age'
                            dataKeyB='satisfactionlevel'
                            scope={scope}
                            yLabel='satisfactionlevel'
                            xLabel='Time at Company'
                            colorA='var(--chart-male)'
                            colorB='var(--chart-female)'
                        />
                        
                ) : chartType == 'barchartdistribution' && genderBarData && activeGenderBarData ? (
                    <BarChartModule 
                        data={activeGenderBarData}
                        dataKeyA='female'
                        dataKeyB='male'
                        dataKeyC='name'
                        scope={scope}
                        yLabel='Respondents'
                        xLabel='Agreement Spectrum'
                        colorA='var(--chart-female)'
                        colorB='var(--chart-male)'
                    />
                ) : null}
                <div className='chart-container__scopebtn-container'>
                    <p>Men</p>
                    <Switch 
                        className='switch--men' 
                        size="small" 
                        defaultChecked 
                        onClick={(checked) => {
                            scope == 'both' && !checked && setScope('women');
                            scope == 'women' && checked && setScope('both');
                            scope == 'men' && !checked && setScope('');
                            scope == '' && checked && setScope('men');
                        }}
                    />
                    <p>Women</p>
                    <Switch 
                        className='switch--women'
                        size="small" 
                        defaultChecked 
                        onClick={(checked) => {
                            scope == 'both' && !checked && setScope('men')
                            scope == 'men' && checked && setScope('both');
                            scope == 'women' && !checked && setScope('');
                            scope == '' && checked && setScope('women');
                        }}
                    />
                </div>
            </ResponsiveContainer>
            </article>
            
            <header className='header-container'>
                <div className='questionvisualizer-container'>
                    {questionsData && questionsData.map((question) => (
                        <div className={'question ' + (question.id == activeQuestion && 'active')}></div>
                    ))}
                </div>
                {questionsData && questionsData.filter(question => question.id == activeQuestion).map(question => (
                    <h1 className={"header-container__title"}>
                         <TextTransition
                            className="custom-text-transition"
                                        springConfig={presets.gentle}
                                    >
                            {question.value}
                        </TextTransition>
                    </h1>
                ))}
            </header>
            <section className={'chartpage__selectcharttype '}>
                <a 
                    onClick={() => setChartType("distributionscale")}
                    className={'chartpage__selectcharttype__anchor ' + (chartType == 'distributionscale' && 'active')}
                >
                    <svg width="40px" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 100" x="0px" y="0px">
                        <path d="M89.5,90.5H9.5V10a1,1,0,0,1,2,0V88.5h78a1,1,0,0,1,0,2Z" stroke="#F6F6F6" stroke-width="7"/>
                        <path d="M18,82a1,1,0,0,1,0-2c7.28,0,11.23-11.6,15.05-22.82C37.1,45.29,41.28,33,50,33S63.5,45.3,68,57.2C72.1,67.92,76.31,79,83,79a1,1,0,0,1,0,2c-8.07,0-12.33-11.21-16.85-23.09C61.87,46.65,57.44,35,50,35c-7.28,0-11.23,11.6-15.05,22.82C30.9,69.71,26.72,82,18,82Z" stroke="#F6F6F6" stroke-width="2"/>
                    </svg>
                    <p className='selectcharttype__anchor--title'>Distribution scale</p>
                </a>
                <a
                    onClick={() => setChartType("distributionacrosstime")}
                    className={'chartpage__selectcharttype__anchor ' + (chartType == 'distributionacrosstime' && 'active')}
                >
                    <svg width="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M6 15L10 11L14 15L20 9M20 9V13M20 9H16" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p className='selectcharttype__anchor--title'>Distribution across time</p>
                </a>
                <a
                    onClick={() => setChartType("scatterdistribution")}
                    className={'chartpage__selectcharttype__anchor ' + (chartType == 'scatterdistribution' && 'active')}
                >
                    <svg width="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M9 15H9.01M16 13H16.01M10 10H10.01M17 8H17.01" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p className='selectcharttype__anchor--title'>Scatter Distribution</p>
                </a>
                <a
                    onClick={() => setChartType("barchartdistribution")}
                    className={'chartpage__selectcharttype__anchor ' + (chartType == 'barchartdistribution' && 'active')}
                >
                    <svg width="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 14.6C3 14.0399 3 13.7599 3.10899 13.546C3.20487 13.3578 3.35785 13.2049 3.54601 13.109C3.75992 13 4.03995 13 4.6 13H5.4C5.96005 13 6.24008 13 6.45399 13.109C6.64215 13.2049 6.79513 13.3578 6.89101 13.546C7 13.7599 7 14.0399 7 14.6V19.4C7 19.9601 7 20.2401 6.89101 20.454C6.79513 20.6422 6.64215 20.7951 6.45399 20.891C6.24008 21 5.96005 21 5.4 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V14.6Z" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 4.6C10 4.03995 10 3.75992 10.109 3.54601C10.2049 3.35785 10.3578 3.20487 10.546 3.10899C10.7599 3 11.0399 3 11.6 3H12.4C12.9601 3 13.2401 3 13.454 3.10899C13.6422 3.20487 13.7951 3.35785 13.891 3.54601C14 3.75992 14 4.03995 14 4.6V19.4C14 19.9601 14 20.2401 13.891 20.454C13.7951 20.6422 13.6422 20.7951 13.454 20.891C13.2401 21 12.9601 21 12.4 21H11.6C11.0399 21 10.7599 21 10.546 20.891C10.3578 20.7951 10.2049 20.6422 10.109 20.454C10 20.2401 10 19.9601 10 19.4V4.6Z" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17 10.6C17 10.0399 17 9.75992 17.109 9.54601C17.2049 9.35785 17.3578 9.20487 17.546 9.10899C17.7599 9 18.0399 9 18.6 9H19.4C19.9601 9 20.2401 9 20.454 9.10899C20.6422 9.20487 20.7951 9.35785 20.891 9.54601C21 9.75992 21 10.0399 21 10.6V19.4C21 19.9601 21 20.2401 20.891 20.454C20.7951 20.6422 20.6422 20.7951 20.454 20.891C20.2401 21 19.9601 21 19.4 21H18.6C18.0399 21 17.7599 21 17.546 20.891C17.3578 20.7951 17.2049 20.6422 17.109 20.454C17 20.2401 17 19.9601 17 19.4V10.6Z" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p className='selectcharttype__anchor--title'>Barchart Distribution</p>
                </a>
                <a
                    onClick={() => setChartType("genderdistribution")}
                    className={'chartpage__selectcharttype__anchor ' + (chartType == 'genderdistribution' && 'active')}
                >
                    <svg width="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.9497 17.9497L15 13H22C22 14.933 21.2165 16.683 19.9497 17.9497Z" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20 10C20 6.13401 16.866 3 13 3V10H20Z" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 12C2 16.4183 5.58172 20 10 20C12.2091 20 14.2091 19.1046 15.6569 17.6569L10 12V4C5.58172 4 2 7.58172 2 12Z" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p className='selectcharttype__anchor--title'>Gender Distribution</p>
                </a>
            </section>
           <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className='reflectionboxsummary-container'
                >
                <h2>Reflection Box Summary</h2>
                {(formsData && formsData.aiInterpretation) && (
                    <>
                    {formsData.aiInterpretation.questionInterpretations.filter(inter => inter.questionTypeId === activeQuestion).length > 0 ? (
                        formsData.aiInterpretation.questionInterpretations.filter(inter => inter.questionTypeId === activeQuestion).map(filteredInter => (
                        <motion.p key={filteredInter.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                            {filteredInter.answerInterpretation}
                        </motion.p>
                        ))
                    ) : (
                        <>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>No answers available.</motion.p>
                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => InterperetAllQuestionAnswers()}>
                            Interpret data
                        </motion.button>
                        </>
                    )}
                    </>
                )}
            </motion.article>
            <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className='reflectionboxsummary-container'
                >
                <h2>Data Reflection</h2>
                {(formsData && formsData.aiInterpretation != null) && (
                    <>
                    {formsData.aiInterpretation.questionInterpretations.filter(inter => inter.questionTypeId === activeQuestion).length > 0 ? (
                        formsData.aiInterpretation.questionInterpretations.filter(inter => inter.questionTypeId === activeQuestion). map(filteredInter => (
                        <motion.p key={filteredInter.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                            {filteredInter.valueInterpretation}
                        </motion.p>
                        ))
                    ) : (
                        <motion.section className='reflectionboxsummary-container__content' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                        <p>No data available.</p>
                        <button onClick={() => InterperetAllQuestionValues()}>Interpret data</button>
                        </motion.section>
                    )}
                    </>
                )}
            </motion.article>
            <article className='reflectionboxchartsummary-container'>
                {aiInterpretation && formsData.aiInterpretation != null && aiInterpretation[activeQuestion].scatterData.length > 0 ? 
                    <ResponsiveContainer width="100%" height="100%">
                        {(formsData && activeAiInterpretation) &&
                            <ScatterChart
                                margin={{
                                top: 20,
                                right: 20,
                                bottom: 35,
                                left: -10,
                                }}
                            >
                                <CartesianGrid stroke="grey" strokeDasharray="3 3" strokeWidth={0.5}/>
                                <XAxis label={{ value: 'Length Of Answer', position: 'insideBottom', offset: -8 }} tick={{ fontSize: 12 }} stroke="#ccc" dataKey="wordlength" type="number" name="wordlength" unit="" />
                                <YAxis label={{ value: 'Satisfaction Level', angle: -90, position: 'insideLeft', dy:60, dx:20 }} domain={[0, 10]} tick={{ fontSize: 12 }} stroke="#ccc" dataKey="value" type="number" name="value" unit="" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter data={activeAiInterpretation.scatterData} fill="var(--chart-male)" />
                            </ScatterChart>
                        }
                    </ResponsiveContainer>
                    : 
                    <section className='reflectionboxchartsummary-container__content'>
                        <div>
                            <h2>AI Data Interpretation</h2>
                        </div>
                        <div>
                            <p>No data available</p>
                        </div>
                        <div>
                            <Button onClick={() => CreateDataFromQuestionAnswersInterpretation()}>Interperet data</Button>
                        </div>
                    </section>
            }
               
            </article>
            <article className='reflectionboxsummary-container'>
                {aiInterpretation && formsData.aiInterpretation != null && aiInterpretation[activeQuestion].scatterData.length > 0 ? 
                    <>
                        <h2>AI Data rating based on each individuals answer</h2>
                        <p>This chart presents the interpreted ratings, which are based on actual responses. The model evaluates each response, assigning a rank on a scale from 0 to 10. Additionally, the length of each response is analyzed, and both metrics are subsequently weighted and displayed on the graph.</p>
                    </>
                :
                    <p>No data available</p>
                }
            </article>
            {formsData && (
                <Article 
                    data={formsData.aiInterpretation.reflectionsInterpretation}
                    datanullcheck={formsData.aiInterpretation}
                    className='reflectionboxsummary-container overallstudy-container'
                    title='Overall Study Reflections Interpretation'
                    noDataTitle='No reflections available.'
                    noDataBtnTrigger={InterperetAllReflectionsForms}
                    noDatabtnTitle='Interperet data'
                />
            )}
            {formsData && (
                <Article 
                    data={formsData.aiInterpretation.realDataInterpretation}
                    datanullcheck={formsData.aiInterpretation}
                    className='reflectionboxsummary-container overalldata-container'
                    title='Overall Study Data Interpretation'
                    noDataTitle='No data interpretation available.'
                    noDataBtnTrigger={InterperetAllRealData}
                    noDatabtnTitle='Interperet data'
                />
            )}
            <Footer className='chartpage-footer'/>
        </section>
    )
}