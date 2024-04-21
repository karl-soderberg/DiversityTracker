import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import './ChartPage.css'
import { MOCKData } from '../data/MockData'
import { useState } from 'react'

type Props = {
    className: string
}

export const ChartPage = ( {className} : Props) => {
  


    return(
        <section className={className}>
            <h1>Percieved Quality Of Leadership Over Time </h1>
            <p>This tracks the percieved leadership among all departments across all genders</p>
            <article className='chart-container'>
                <ResponsiveContainer width="90%" height="90%">
                    <LineChart data={MOCKData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="numberofmen" stroke="#8884d8" />
                        <Line type="monotone" dataKey="numberofwomen" stroke="#D88484" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="value" />
                        <YAxis />
                    </LineChart>
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
                        {/* <Tooltip /> */}
                            <Area type="monotone" dataKey="numberofwomen" name='distribution' stroke="#D88484" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="numberofmen" name='distribution' stroke="#8296CA" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </article>
        </section>
    )
}