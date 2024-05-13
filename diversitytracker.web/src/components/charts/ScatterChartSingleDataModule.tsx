import { useEffect } from "react"
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts"

type Props = {
    data: any,
    dataKeyA: string,
    dataKeyB: string,
    yLabel: string,
    xLabel: string,
    colorA: string,
}

export const ScatterChartSingleDataModule = ({data, dataKeyA, dataKeyB, yLabel, xLabel, colorA}: Props) => {
    return (
        <ResponsiveContainer>
            <ScatterChart
                margin={{
                top: 20,
                right: 20,
                bottom: 35,
                left: -10,
                }}
            >
                <CartesianGrid stroke="grey" strokeDasharray="3 3" strokeWidth={0.5}/>
                <XAxis label={{ value: xLabel, position: 'insideBottom', offset: -8 }} tick={{ fontSize: 12 }} stroke="#ccc" dataKey={dataKeyA} type="number" name={dataKeyA} unit="" />
                <YAxis label={{ value: yLabel, angle: -90, position: 'insideLeft', dy:60, dx:20 }} domain={[0, 10]} tick={{ fontSize: 12 }} stroke="#ccc" dataKey={dataKeyB} type="number" name={dataKeyB} unit="" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={data} fill={colorA} />
            </ScatterChart>
        </ResponsiveContainer>
    )
}