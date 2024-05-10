import { Tooltip } from "antd"
import { useEffect } from "react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

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

export const DistributionChartModule = ({data, dataKeyA, dataKeyB, scope, yLabel, xLabel, colorA, colorB}: Props) => {

    useEffect(() => {
        console.log(data);
    }, [])
    return (
        <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 10, right: 20, left: -5, bottom: 35 }}>
                {(scope === "both" || scope === "women") && 
                    <Line type="monotone" dataKey={dataKeyA} stroke={colorA} strokeWidth={2}/>
                }
                {(scope === "both" || scope === "men") && 
                    <Line type="monotone" dataKey={dataKeyB} stroke={colorB} strokeWidth={2}/>
                }
                <CartesianGrid stroke="grey" strokeDasharray="3 3" strokeWidth={0.5}/>
                <XAxis dataKey="date" stroke="#ccc" label={{ value: xLabel, position: 'insideBottom', offset: -10 }} />
                <YAxis stroke="#ccc" label={{ value: yLabel, angle: -90, position: 'insideLeft', offset: 15, dy:60 }} />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}