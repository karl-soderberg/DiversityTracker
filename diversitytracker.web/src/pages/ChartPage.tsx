import { Area, AreaChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import './ChartPage.css'
import { useState } from 'react'
import { MOCKData, data01, } from '../data/MockData'
import { pieData } from '../data/ProcessedData'

// const FilteredMockData = [
//     MOCKmay.filter(entry => entry.gender === 'male').map(entry => entry.rating),
//     MOCKmay.filter(entry => entry.gender === 'female').map(entry => entry.rating),
// ];

type Props = {
    className: string
}




export const ChartPage = ( {className} : Props) => {
    const [chartType, setChartType] = useState<string>("distributionscale");
    const [scope, setScope] = useState<string>("both");

    return(
        <section className={className}>
            <h1>Percieved Quality Of Leadership Over Time </h1>
            <p>This tracks the percieved leadership among all departments across all genders</p>
            <article className='chart-container'>
                <ResponsiveContainer width="90%" height="90%">
                    {chartType == 'distributionscale' &&
                        <AreaChart data={MOCKData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#D88484" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#D88484" stopOpacity={.2}/>
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8288CA" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#828DCA" stopOpacity={.2}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="value" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            {(scope === "both" || scope === "women") && 
                                <Area type="monotone" dataKey="numberofwomen" name='distribution' stroke="#D88484" fillOpacity={1} fill="url(#colorUv)" /> 
                            }
                            {(scope === "both" || scope === "men") && 
                                <Area type="monotone" dataKey="numberofmen" name='distribution' stroke="#8296CA" fillOpacity={1} fill="url(#colorPv)" />
                            }
                        </AreaChart>
                    }
                    {chartType == 'distributionacrosstime' &&
                        <LineChart data={MOCKData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            {(scope === "both" || scope === "women") && 
                                <Line type="monotone" dataKey="numberofwomen" stroke="#D88484" />
                            }
                            {(scope === "both" || scope === "men") && 
                                <Line type="monotone" dataKey="numberofmen" stroke="#8884d8" />
                            }
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="date" />
                            <YAxis />
                        </LineChart>
                    }

                    {/* {chartType == 'piechart' &&
                        //console.log(MOCKmay)
                        <PieChart data={MOCKmay} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <Pie
                          dataKey="gender"
                          isAnimationActive={false}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        />
                        <Tooltip />
                      </PieChart>
                    } */}

                    {chartType == 'piechart' &&
                        <PieChart width={400} height={400}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                        </PieChart>
                    }

                </ResponsiveContainer>
            </article>
            <select name="" id="" onChange={(e) => setChartType(e.target.value)}>
                <option value="distributionscale">Distribution scale</option>
                <option value="distributionacrosstime">Distribution across time</option>
                <option value="piechart">piechart</option>
            </select>
            <select name="" id="" onChange={(e) => setScope(e.target.value)}>
                <option value="both">both</option>
                <option value="men">men</option>
                <option value="women">women</option>
            </select>
        </section>
    )
}