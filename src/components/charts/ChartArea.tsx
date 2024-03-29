import {Area, YAxis, XAxis, Tooltip, AreaChart, CartesianGrid, ResponsiveContainer} from 'recharts'
import {chartData} from "@/types/app.definitions.ts";


interface IProps {
    data: chartData[]
}



function Chart(props: IProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={props.data}>
                <XAxis dataKey="date"/>
                <YAxis allowDecimals={false}/>
                <CartesianGrid strokeDasharray="10 10"/>
                <Tooltip/>
                <Area type="monotone" dataKey="count" stroke="#1e328a" fillOpacity={0.6} fill="#3b82f6"/>
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default Chart
