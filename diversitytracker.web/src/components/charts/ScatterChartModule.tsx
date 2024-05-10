import { useEffect } from "react"
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, XAxis, YAxis } from "recharts"

type Props = {
    dataA: any,
    dataB: any,
    dataKeyA: string,
    dataKeyB: string,
    scope: string,
    yLabel: string,
    xLabel: string,
    colorA: string,
    colorB: string
}

export const ScatterChartModule = ({dataA, dataB, dataKeyA, dataKeyB, scope, yLabel, xLabel, colorA, colorB}: Props) => {
    return (
        <ResponsiveContainer>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 5,
                }}
                >
                <CartesianGrid stroke="grey" strokeDasharray="3 3" strokeWidth={0.5} />
                <XAxis type="number" stroke="#ccc" dataKey={dataKeyA} name="age" label={{ value: xLabel, position: 'insideBottom', offset: -15 }} />
                <YAxis type="number" stroke="#ccc" dataKey={dataKeyB} name="satisfactionlevel" label={{ value: yLabel, angle: -90, position: 'insideLeft', dy:50 }} domain={[0, 10]}/>
                {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
                {scope === 'both' && (
                    <>
                        <Scatter name="Male" data={dataA} fill={colorA} />
                        <Scatter name="Female" data={dataB} fill={colorB} />
                    </>
                )}
                {scope === 'men' && <Scatter name="Male" data={dataA} fill={colorA} />}
                {scope === 'women' && <Scatter name="Female" data={dataB} fill={colorB} />}

            </ScatterChart>
        </ResponsiveContainer>
    )
}