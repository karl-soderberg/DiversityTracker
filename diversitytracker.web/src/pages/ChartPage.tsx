import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, Rectangle, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts'
import './ChartPage.css'
import { useEffect, useState } from 'react'
import { MOCKData, barChartMockData } from '../data/MockData'
import { pieData, scatterFemaleData, scatterMaleData } from '../data/ProcessedData'
import { APIFormsResponse, ChartDistributionDict, ChartGenderDistribution, DistributionData, DistributionDataResponse, GenderDistribution, GenderValue, Question, scatterAiDataArr, scatterAiDataDict, scatterData, scatterDataArr, scatterDataDict } from '../types/types'
import { MapAPIFormsAIResponseToScatterChart, MapAPIFormsResponseToBarChart, MapAPIFormsResponseToDistributionDataType, MapAPIFormsResponseToGenderDistribution, MapAPIFormsResponseToScatterChart } from '../util/dataconversion'
import { Switch } from 'antd'

// const FilteredMockData = [
//     MOCKmay.filter(entry => entry.gender === 'male').map(entry => entry.rating),
//     MOCKmay.filter(entry => entry.gender === 'female').map(entry => entry.rating),
// ];

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

    const COLORS = ['#0043e1', '#d986ec', '#FFBB28', '#00C49F', '#FF8042'];

    useEffect(() => {
        if(distributionformdata){
            setActiveDistributionFormData(distributionformdata[activeQuestion])
        }
        if(genderDistributionData){
            setActiveGenderDistributionData(genderDistributionData[activeQuestion]);
        }
        if(genderBarData){
            setActiveGenderBarData(genderBarData[activeQuestion]);
        }
        if(timeAtCompanyScatterData){
            setActiveTimeAtCompanyScatterData(timeAtCompanyScatterData[activeQuestion])
        }
        if(aiInterpretation){
            setActiveAiInterpretation(aiInterpretation[activeQuestion])
        }
    }, [distributionformdata, aiInterpretation])

    useEffect(() => {
        if(activeQuestion && formsData && questionData && distributionformdata == undefined){
            setDistributionFormData(MapAPIFormsResponseToDistributionDataType(formsData, questionData));
            setGenderDistributionData(MapAPIFormsResponseToGenderDistribution(formsData, questionData));
            setGenderBarData(MapAPIFormsResponseToBarChart(formsData, questionData));
            setTimeAtCompanyScatterData(MapAPIFormsResponseToScatterChart(formsData, questionData));
            if(formsData.aiInterpretation != undefined){
                setAiInterpretation(MapAPIFormsAIResponseToScatterChart(formsData, questionData));
            }
        }
    }, [activeQuestion]);

    useEffect(() => {
        if(questionData){
            setQuestionsData(questionData);
            setActiveQuestion(questionData[0].id)
        }
    }, [questionData]);


    // const isAnswerInterpretationNull = (questionTypeId: string): boolean => {
    //     const interpretationResponse = formsData.aiInterpretation.questionInterpretations.some(inter => inter.questionTypeId === questionTypeId && inter.answerInterpretation === null);
    //     console.log(!!interpretationResponse)
    //     return !!interpretationResponse;
    //   };

    return(
        <section className={className}>
            <div className='chartpage-container--bg'></div>
            <div className='chartpage__selectquestion'>
                <a>
                    <svg width="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.88675 5.68247C7.49623 5.29195 6.86307 5.29195 6.47254 5.68247L1.58509 10.5747C0.804698 11.3559 0.805008 12.6217 1.58579 13.4024L6.47615 18.2928C6.86667 18.6833 7.49984 18.6833 7.89036 18.2928C8.28089 17.9023 8.28089 17.2691 7.89036 16.8786L3.70471 12.6929C3.31419 12.3024 3.31419 11.6692 3.70472 11.2787L7.88675 7.09669C8.27728 6.70616 8.27728 6.073 7.88675 5.68247Z" fill="#FFFFFFBD"/>
                    </svg>
                </a>
                <a>
                    <svg width="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1359 18.2928C16.5264 18.6833 17.1596 18.6833 17.5501 18.2928L22.4375 13.4006C23.2179 12.6194 23.2176 11.3536 22.4369 10.5728L17.5465 5.68247C17.156 5.29195 16.5228 5.29195 16.1323 5.68247C15.7418 6.073 15.7418 6.70616 16.1323 7.09669L20.3179 11.2823C20.7085 11.6729 20.7085 12.306 20.3179 12.6965L16.1359 16.8786C15.7454 17.2691 15.7454 17.9023 16.1359 18.2928Z" fill="#FFFFFFBD"/>
                    </svg>
                </a>
            </div>
            {/* {formsData && (
                <>
                    <h3>Overall Data Interpretation:</h3>
                    {formsData.aiInterpretation != null && formsData.aiInterpretation.realDataInterpretation ? (
                        <p>{formsData.aiInterpretation.realDataInterpretation}</p>
                    ) : (
                        <>
                            <p>No data interpretation available.</p>
                            <button onClick={() => InterperetAllRealData()}>Interperet data</button>
                        </>
                    )}
                </>
            )}
            {formsData && (
                <>
                    <h3>Reflections Interpretation:</h3>
                    {formsData.aiInterpretation != null && formsData.aiInterpretation.reflectionsInterpretation ? (
                        <p>{formsData.aiInterpretation.reflectionsInterpretation.replace(/\|\|/g, ' ')}</p>
                    ) : (
                        <>
                            <p>No reflections available.</p>
                            <button onClick={() => InterperetAllReflectionsForms()}>Interperet data</button>
                        </>
                    )}
                </>
            )} */}
            <article className='chart-container'>
            <ResponsiveContainer width="90%" height="90%">
                {chartType === 'distributionscale' && activeDistributionFormData && distributionformdata ? (
                    <AreaChart data={activeDistributionFormData.data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--chart-female)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="var(--chart-female)" stopOpacity={.2}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var( --chart-male)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="var( --chart-male)" stopOpacity={.2}/>
                            </linearGradient>
                        </defs> 
                        <XAxis dataKey="value" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        {(scope === "both" || scope === "women") && 
                            <Area type="monotone" dataKey="numberofwomen" name='women' stroke="var(--chart-female)" fillOpacity={1} fill="url(#colorUv)" /> 
                        }
                        {(scope === "both" || scope === "men") && 
                            <Area type="monotone" dataKey="numberofmen" name='men' stroke="var( --chart-male)" fillOpacity={1} fill="url(#colorPv)" />
                        }
                        <Legend />
                    </AreaChart>
                ) : chartType === 'distributionacrosstime' ? (
                    <LineChart data={MOCKData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        {(scope === "both" || scope === "women") && 
                            <Line type="monotone" dataKey="numberofwomen" stroke="var(--chart-female)" />
                        }
                        {(scope === "both" || scope === "men") && 
                            <Line type="monotone" dataKey="numberofmen" stroke="var( --chart-male)" />
                        }
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Legend />
                    </LineChart>
                ) : chartType === 'genderdistribution' && genderDistributionData && activeGenderDistributionData ? (
                    <PieChart width={400} height={400}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={activeGenderDistributionData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label={({ name, value }) => `${name} (${value.toFixed(2)}%)`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                ) : chartType === 'scatterdistribution' && activeTimeAtCompanyScatterData && timeAtCompanyScatterData ? (
                        <ScatterChart
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                            >
                            <CartesianGrid />
                            <XAxis type="number" dataKey="age" name="age" label={{ value: 'Time at Company', position: 'insideBottom', offset: -15 }} />
                            <YAxis type="number" dataKey="satisfactionlevel" name="satisfactionlevel" label={{ value: 'Satisfaction Level', angle: -90, position: 'insideLeft' }} domain={[0, 10]}/>
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            {scope === 'both' && (
                                <>
                                    <Scatter name="Male" data={activeTimeAtCompanyScatterData.scatterMaleData} fill="var(--chart-male)" />
                                    <Scatter name="Female" data={activeTimeAtCompanyScatterData.scatterFemaleData} fill="var(--chart-female)" />
                                </>
                            )}
                            {scope === 'men' && <Scatter name="Male" data={activeTimeAtCompanyScatterData.scatterMaleData} fill="var(--chart-male)" />}
                            {scope === 'women' && <Scatter name="Female" data={activeTimeAtCompanyScatterData.scatterFemaleData} fill="var(--chart-female)" />}

                            <Legend align="right" />
                        </ScatterChart>
                        
                ) : chartType == 'barchartdistribution' && genderBarData && activeGenderBarData ? (
                    <BarChart
                        data={activeGenderBarData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {(scope === "both" || scope === "women") && 
                            <Bar dataKey="female" fill="var(--chart-female)" activeBar={<Rectangle stroke="var(--chart-male)" />} />     
                        }
                        {(scope === "both" || scope === "men") && 
                            <Bar dataKey="male" fill="var(--chart-male)" activeBar={<Rectangle stroke="var(--chart-female)" />} />
                        }     
                    </BarChart>
                ) : null}
                <div className='chart-container__scopebtn-container'>
                    <p>Men</p>
                    <Switch className='switch--men' size="small" defaultChecked />
                    <p>Women</p>
                    <Switch className='switch--women' size="small" defaultChecked />
                </div> 
            </ResponsiveContainer>
            </article>
            <h1 className={className + "__title"}>Percieved Quality Of Leadership Over Time</h1>
            {(formsData && formsData.aiInterpretation) && (
                    <>
                        {formsData.aiInterpretation.questionInterpretations.filter(inter => inter.questionTypeId === activeQuestion).length > 0 ? (
                            formsData.aiInterpretation.questionInterpretations.filter(inter => inter.questionTypeId === activeQuestion).map(filteredInter => (
                                <p className={className + "__reflection"} key={filteredInter.id}>{filteredInter.answerInterpretation}</p>
                            ))
                        ) : (
                            <>
                                <p className={className + "__reflection"}>No answers available.</p>
                                <button onClick={() => InterperetAllQuestionAnswers()}>Interperet data</button>
                            </>
                        )}
                    </>
                )}
            {/* <p>This tracks the percieved leadership among all departments across all genders</p> */}
            {/* <select className={className + '__selectchhart'} name="" id="" onChange={(e) => setChartType(e.target.value)}>
                <option value="distributionscale">Distribution scale</option>
                <option value="distributionacrosstime">Distribution across time</option>
                <option value="genderdistribution">Gender Distribution</option>
                <option value="scatterdistribution">Scatter Distribution</option>
                <option value="barchartdistribution">Barchart Distribution</option>
            </select> */}
            {/* <select name="" id="" onChange={(e) => setScope(e.target.value)}>
                <option value="both">both</option>
                <option value="men">men</option>
                <option value="women">women</option>
            </select> */}
            {/* {questionsData && 
                <select name="" id="" onChange={(e) => {
                        setActiveQuestion(e.target.value);
                        distributionformdata &&setActiveDistributionFormData(distributionformdata[activeQuestion])
                        genderBarData && setActiveGenderBarData(genderBarData[activeQuestion]);
                        timeAtCompanyScatterData && setActiveTimeAtCompanyScatterData(timeAtCompanyScatterData[activeQuestion]);
                        aiInterpretation && setActiveAiInterpretation(aiInterpretation[activeQuestion]);
                    }}>
                    {questionsData.map((question) => (
                        <option value={question.id}>{question.value}</option>
                    ))}
                </select>
            } */}
            {/* <p>{activeQuestion}</p> */}
            {/* <article className='datasummary-container'>
                <h2>Reflection Box Summary</h2>
                {(formsData && formsData.aiInterpretation) && (
                    <>
                        {formsData.aiInterpretation.questionInterpretations.filter(inter => inter.questionTypeId === activeQuestion).length > 0 ? (
                            formsData.aiInterpretation.questionInterpretations.filter(inter => inter.questionTypeId === activeQuestion).map(filteredInter => (
                                <p key={filteredInter.id}>{filteredInter.answerInterpretation}</p>
                            ))
                        ) : (
                            <>
                                <p>No answers available.</p>
                                <button onClick={() => InterperetAllQuestionAnswers()}>Interperet data</button>
                            </>
                        )}
                    </>
                )}
            </article> */}
            {/* <article className='reflectionboxsummary-container'>
                <h2>Data Reflection</h2>
                {(formsData && formsData.aiInterpretation != null) && (
                    <>
                        {formsData.aiInterpretation.questionInterpretations.filter(inter => inter.questionTypeId === activeQuestion).length > 0 ? (
                            formsData.aiInterpretation.questionInterpretations.filter(inter => inter.questionTypeId === activeQuestion).map(filteredInter => (
                                <p key={filteredInter.id}>{filteredInter.valueInterpretation}</p>
                            ))
                        ) : (
                            <>
                                <p>No data available.</p>
                                <button onClick={() => InterperetAllQuestionValues()}>Interperet data</button>
                            </>
                        )}
                    </>
                )}

            </article> */}
            {/* <article className='reflectionboxchartsummary-container'>
                {aiInterpretation && formsData.aiInterpretation != null && aiInterpretation[activeQuestion].scatterData.length > 0 ? 
                    <ResponsiveContainer width="100%" height="100%">
                        {(formsData && activeAiInterpretation) &&
                            <ScatterChart
                                margin={{
                                top: 20,
                                right: 20,
                                bottom: 10,
                                left: 10,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="wordlength" type="number" name="wordlength" unit="" />
                                <YAxis dataKey="value" type="number" name="value" unit="" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Legend />
                                <Scatter name="Ratings based on question answer field" data={activeAiInterpretation.scatterData} fill="var(--chart-male)" />
                            </ScatterChart>
                        }
                    </ResponsiveContainer>
                    : 
                    <>
                        <p>No data available</p>
                        <button onClick={() => CreateDataFromQuestionAnswersInterpretation()}>Interperet data</button>
                    </>
            }
               
            </article> */}
            {/* <article className='reflectionboxsummary-container'>
                {aiInterpretation && formsData.aiInterpretation != null && aiInterpretation[activeQuestion].scatterData.length > 0 ? 
                    <>
                        <h2>Rating based on real answers</h2>
                        <p>This chart shows the interpereted ratings based on real answers.</p>
                    </>
                :
                    <p>No data available</p>
                }
                
            </article> */}
        </section>
    )
}