import { Tooltip } from "antd"
import { useEffect } from "react"
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { pieData } from "../../data/ProcessedData"

type Props = {
    data: any,
    labelA: string,
}


const COLORS = ['#0043e1', '#d986ec', '#FFBB28', '#00C49F', '#FF8042'];

export const PieChartModule = ({data, labelA}: Props) => {
    return (
        <ResponsiveContainer>
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={65}
                    label={({ value }) => `${value.toFixed(1)}%`}
                >
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke='#5484EB'/>
                    ))}
                </Pie>
                <text x={132} y={20} textAnchor="end" dominantBaseline="middle" fill="#ccc">
                    {labelA}
                </text>

                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}