import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import './ChartPage.css'
import { useEffect, useState } from 'react'
import { MOCKData, MOCKDatav1, } from '../data/MockData'
import { barChartMockData, pieData, scatterFemaleData, scatterMaleData } from '../data/ProcessedData'
import { useQuery } from 'react-query'
import { APIFormsResponse, DistributionDataType } from '../types/types'
import { GetFormsData } from '../util/Http'
import { MapAPIFormsResponseToDistributionDataType } from '../util/dataconversion'

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
    refetch: any
}


export const ChartPage = ( {className, questionData, isLoading, isError, error, refetch} : Props) => {
    const [chartType, setChartType] = useState<string>("distributionscale");
    const [scope, setScope] = useState<string>("both");
    const [formdata, setFormData] = useState<Array<DistributionDataType>>();

    const COLORS = ['#0043e1', '#d986ec', '#FFBB28', '#00C49F', '#FF8042'];

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await GetFormsData();
            const processedData = await MapAPIFormsResponseToDistributionDataType(fetchedData);
            setFormData(processedData);
        };
        fetchData();
        
    }, []);

    return(
        <section className={className}>
            <h1>Percieved Quality Of Leadership Over Time </h1>
            <p>This tracks the percieved leadership among all departments across all genders</p>
            <article className='chart-container'>
                <ResponsiveContainer width="90%" height="90%">
                    {chartType == 'distributionscale' &&
                        <AreaChart data={formdata}
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
                                <Area type="monotone" dataKey="numberofwomen" name='distribution' stroke="var(--chart-female)" fillOpacity={1} fill="url(#colorUv)" /> 
                            }
                            {(scope === "both" || scope === "men") && 
                                <Area type="monotone" dataKey="numberofmen" name='distribution' stroke="var( --chart-male)" fillOpacity={1} fill="url(#colorPv)" />
                            }
                            <Legend />
                        </AreaChart>
                    }
                    {chartType == 'distributionacrosstime' &&
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
                        <Legend />
                    </PieChart>
                    }

                    {chartType == 'scatterdistribution' &&
                        <ScatterChart
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                            >
                            <CartesianGrid />
                            <XAxis type="number" dataKey="age" name="age" label={{ value: 'Age', position: 'insideBottom', offset: -15 }} />
                            <YAxis type="number" dataKey="satisfactionlevel" name="satisfactionlevel" label={{ value: 'Satisfaction Level', angle: -90, position: 'insideLeft' }}/>
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            {scope === 'both' && (
                                <>
                                    <Scatter name="Male" data={scatterMaleData} fill="var(--chart-male)" />
                                    <Scatter name="Female" data={scatterFemaleData} fill="var(--chart-female)" />
                                </>
                            )}
                            {scope === 'men' && <Scatter name="Male" data={scatterMaleData} fill="var(--chart-male)" />}
                            {scope === 'women' && <Scatter name="Female" data={scatterFemaleData} fill="var(--chart-female)" />}

                            <Legend align="right" />
                            </ScatterChart>
                        }

                    {chartType == 'barchartdistribution' &&
                        <BarChart
                                data={barChartMockData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="agreeLevel" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" />
                                </BarChart>
                            }

                </ResponsiveContainer>
            </article>
            <select name="" id="" onChange={(e) => setChartType(e.target.value)}>
                <option value="distributionscale">Distribution scale</option>
                <option value="distributionacrosstime">Distribution across time</option>
                <option value="genderdistribution">Gender Distribution</option>
                <option value="scatterdistribution">Scatter Distribution</option>
                <option value="barchartdistribution">Barchart Distribution</option>
            </select>
            <select name="" id="" onChange={(e) => setScope(e.target.value)}>
                <option value="both">both</option>
                <option value="men">men</option>
                <option value="women">women</option>
            </select>
        </section>
    )
}