import { Tooltip } from "antd"
import { useEffect } from "react"
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, XAxis, YAxis } from "recharts"

type Props = {
    data: any,
    dataKeyA: string,
    dataKeyB: string,
    dataKeyC: string,
    scope: string,
    yLabel: string,
    xLabel: string,
    colorA: string,
    colorB: string
}

export const BarChartModule = ({data, dataKeyA, dataKeyB, dataKeyC, scope, yLabel, xLabel, colorA, colorB}: Props) => {
    return (
        <ResponsiveContainer>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 50
                }}
                >
                <CartesianGrid stroke="grey" strokeDasharray="3 3" strokeWidth={0.5} />
                {/* @ts-ignore */}
                <XAxis dataKey={dataKeyC} stroke="#ccc" tick={{ fontSize: 9, angle: -25, textAnchor: 'end' }} label={{ value: xLabel, position: 'insideBottom', dy:30, dx:-15 }}/> 
                <YAxis stroke="#ccc" label={{ value: yLabel, angle: -90, position: 'insideLeft', offset: 10, dy:40 }} />
                <Tooltip />
                {(scope === "both" || scope === "women") && 
                    <Bar dataKey={dataKeyA} fill={colorA} activeBar={<Rectangle stroke={colorA} />} />     
                }
                {(scope === "both" || scope === "men") && 
                    <Bar dataKey={dataKeyB} fill={colorB} activeBar={<Rectangle stroke={colorB} />} />
                }     
            </BarChart>
        </ResponsiveContainer>
    )
}