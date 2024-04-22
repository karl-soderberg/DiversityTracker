import { Area, AreaChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
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

    const COLORS = ['#0088FE', '#FFBB28', '#00C49F', '#FF8042'];

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
                                    <stop offset="5%" stopColor={COLORS[1]} stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor={COLORS[1]} stopOpacity={.2}/>
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor={COLORS[0]} stopOpacity={.2}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="value" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            {(scope === "both" || scope === "women") && 
                                <Area type="monotone" dataKey="numberofwomen" name='distribution' stroke={COLORS[1]} fillOpacity={1} fill="url(#colorUv)" /> 
                            }
                            {(scope === "both" || scope === "men") && 
                                <Area type="monotone" dataKey="numberofmen" name='distribution' stroke={COLORS[0]} fillOpacity={1} fill="url(#colorPv)" />
                            }
                        </AreaChart>
                    }
                    {chartType == 'distributionacrosstime' &&
                        <LineChart data={MOCKData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            {(scope === "both" || scope === "women") && 
                                <Line type="monotone" dataKey="numberofwomen" stroke={COLORS[1]} />
                            }
                            {(scope === "both" || scope === "men") && 
                                <Line type="monotone" dataKey="numberofmen" stroke={COLORS[0]} />
                            }
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="date" />
                            <YAxis />
                        </LineChart>
                    }

                    {chartType == 'genderdistribution' &&
                        <PieChart width={400} height={400}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={pieData}
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
                    </PieChart>
                    }

                </ResponsiveContainer>
            </article>
            <select name="" id="" onChange={(e) => setChartType(e.target.value)}>
                <option value="distributionscale">Distribution scale</option>
                <option value="distributionacrosstime">Distribution across time</option>
                <option value="genderdistribution">Gender Distribution</option>
            </select>
            <select name="" id="" onChange={(e) => setScope(e.target.value)}>
                <option value="both">both</option>
                <option value="men">men</option>
                <option value="women">women</option>
            </select>
        </section>
    )
}