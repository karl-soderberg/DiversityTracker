import { Tooltip } from "antd"
import { useEffect } from "react"
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

type Props = {
    data: any,
    dataKeyA: string,
    dataKeyB: string,
    scope: string,
    yLabel: string,
    xLabel: string,
    colorA: string,
    colorB: string
}

export const AreaChartModule = ({data, dataKeyA, dataKeyB, scope, yLabel, xLabel, colorA, colorB}: Props) => {
    return (
        <ResponsiveContainer>
            <AreaChart data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 35 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colorA} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colorA} stopOpacity={.2}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colorB} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colorB} stopOpacity={.2}/>
                    </linearGradient>
                </defs> 
                <XAxis dataKey="value" stroke="#ccc" label={{ value: yLabel, position: 'insideBottom', offset: -10 }}  />
                <YAxis stroke="#ccc" label={{ value: xLabel, angle: -90, position: 'insideLeft', offset: 10, dy:40 }}/>
                <CartesianGrid stroke="grey" strokeDasharray="3 3" strokeWidth={0.5} />
                {(scope === "both" || scope === "women") && 
                    <Area type="monotone" dataKey={dataKeyA} name='women' stroke={colorA} fillOpacity={1} fill="url(#colorUv)" /> 
                }
                {(scope === "both" || scope === "men") && 
                    <Area type="monotone" dataKey={dataKeyB} name='men' stroke={colorB} fillOpacity={1} fill="url(#colorPv)" />
                }
            </AreaChart>
        </ResponsiveContainer>
    )
}